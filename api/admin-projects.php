<?php

/**
 * Solar Edge Innovations - React Admin Projects Management API
 * Provides endpoints for React Admin UI to list, upload, edit, and delete project gallery images
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/upload.php';

// Verify Admin Session
$admin = require_admin_session();

$db = getDB();

// -------------------------------------------------------------
// GET: Fetch all projects with their gallery images for Admin
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $db->query("SELECT * FROM projects WHERE (status IS NULL OR status != 'deleted') ORDER BY id DESC");
        $rawProjects = $stmt->fetchAll();

        $imgStmt = $db->prepare("
            SELECT id, image_path, image_alt, sort_order 
            FROM project_images 
            WHERE project_id = :pid AND (status IS NULL OR status != 'deleted')
            ORDER BY sort_order ASC, id ASC
        ");

        $projects = [];
        foreach ($rawProjects as $p) {
            $pid = (int)$p['id'];
            $imgStmt->execute([':pid' => $pid]);
            $galleryPhotos = $imgStmt->fetchAll();

            $images = [];
            foreach ($galleryPhotos as $g) {
                $images[] = [
                    'id' => (int)$g['id'],
                    'url' => $g['image_path'],
                    'alt' => $g['image_alt'] ?? '',
                    'sort_order' => (int)$g['sort_order']
                ];
            }

            $projects[] = [
                'id' => $pid,
                'title' => $p['title'],
                'description' => $p['description'] ?? '',
                'location' => $p['location'] ?? '',
                'category' => $p['category'] ?? 'Rooftop Solar',
                'cover_image' => $p['image'] ?? '',
                'status' => $p['status'],
                'images' => $images,
                'created_at' => $p['created_at'] ?? null,
                'updated_at' => $p['updated_at'] ?? null
            ];
        }

        echo json_encode([
            'success' => true,
            'projects' => $projects
        ], JSON_UNESCAPED_SLASHES);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching projects: ' . $e->getMessage()
        ]);
    }
    exit;
}

// -------------------------------------------------------------
// POST: Actions (create, update, delete_project, delete_image, toggle_status)
// -------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    // If request body was sent as JSON without multipart
    if (empty($action)) {
        $jsonInput = json_decode(file_get_contents('php://input'), true);
        if (is_array($jsonInput)) {
            $_POST = array_merge($_POST, $jsonInput);
            $action = $_POST['action'] ?? '';
        }
    }

    try {
        // 1. TOGGLE PROJECT STATUS
        if ($action === 'toggle_status') {
            $projectId = (int)($_POST['project_id'] ?? 0);
            $newStatus = ($_POST['status'] ?? '') === 'published' ? 'published' : 'draft';

            $stmt = $db->prepare("UPDATE projects SET status = :status WHERE id = :id");
            $stmt->execute([':status' => $newStatus, ':id' => $projectId]);

            echo json_encode([
                'success' => true,
                'message' => "Project status updated to {$newStatus}.",
                'status' => $newStatus
            ]);
            exit;
        }

        // 2. DELETE SINGLE IMAGE (Soft Delete)
        if ($action === 'delete_image') {
            $imageId = (int)($_POST['image_id'] ?? 0);
            $find = $db->prepare("SELECT * FROM project_images WHERE id = :id LIMIT 1");
            $find->execute([':id' => $imageId]);
            $img = $find->fetch();

            if ($img) {
                try {
                    $del = $db->prepare("UPDATE project_images SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP WHERE id = :id");
                    $del->execute([':id' => $imageId]);
                } catch (Exception $e) {
                    $del = $db->prepare("DELETE FROM project_images WHERE id = :id");
                    $del->execute([':id' => $imageId]);
                }

                echo json_encode([
                    'success' => true,
                    'message' => 'Image removed successfully.'
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Image not found.']);
            }
            exit;
        }

        // 3. DELETE ENTIRE PROJECT (Soft Delete)
        if ($action === 'delete_project') {
            $projectId = (int)($_POST['project_id'] ?? 0);

            $stmt = $db->prepare("SELECT id FROM projects WHERE id = :id AND (status IS NULL OR status != 'deleted') LIMIT 1");
            $stmt->execute([':id' => $projectId]);
            $proj = $stmt->fetch();

            if ($proj) {
                // Soft delete the project
                $db->prepare("UPDATE projects SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP WHERE id = :id")->execute([':id' => $projectId]);

                // Soft delete associated gallery images
                try {
                    $db->prepare("UPDATE project_images SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP WHERE project_id = :pid")->execute([':pid' => $projectId]);
                } catch (Exception $e) {}

                echo json_encode([
                    'success' => true,
                    'message' => 'Project and associated photos deleted successfully.'
                ]);
            } else {
                http_response_code(404);
                echo json_encode(['success' => false, 'message' => 'Project not found.']);
            }
            exit;
        }

        // 3b. RESTORE SOFT-DELETED PROJECT
        if ($action === 'restore_project') {
            $projectId = (int)($_POST['project_id'] ?? 0);
            $db->prepare("UPDATE projects SET status = 'published', deleted_at = NULL WHERE id = :id")->execute([':id' => $projectId]);
            try {
                $db->prepare("UPDATE project_images SET status = 'active', deleted_at = NULL WHERE project_id = :pid")->execute([':pid' => $projectId]);
            } catch (Exception $e) {}

            echo json_encode([
                'success' => true,
                'message' => 'Project restored successfully.'
            ]);
            exit;
        }

        // 4. CREATE OR UPDATE PROJECT WITH IMAGES
        $title = trim($_POST['title'] ?? '');
        $description = trim($_POST['description'] ?? '');
        $location = trim($_POST['location'] ?? '');
        $category = trim($_POST['category'] ?? 'solar');
        $status = in_array($_POST['status'] ?? '', ['published', 'draft']) ? $_POST['status'] : 'published';
        $projectId = isset($_POST['project_id']) && (int)$_POST['project_id'] > 0 ? (int)$_POST['project_id'] : null;

        if (empty($title)) {
            $catLabel = !empty($category) ? ucfirst($category) : 'Solar';
            $title = $catLabel . (!empty($location) ? ' - ' . $location : ' Installation');
        }

        // Handle Cover Image Upload
        $coverPath = null;
        if (!empty($_FILES['cover_image']) && $_FILES['cover_image']['error'] !== UPLOAD_ERR_NO_FILE) {
            $uploadRes = handle_image_upload($_FILES['cover_image']);
            if ($uploadRes['success']) {
                $coverPath = $uploadRes['path'];
            } else {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Cover image error: ' . $uploadRes['error']]);
                exit;
            }
        }

        if ($projectId) {
            // Update
            if ($coverPath) {
                $stmt = $db->prepare("
                    UPDATE projects 
                    SET title = :t, description = :d, location = :loc, category = :cat, image = :img, status = :st, updated_at = CURRENT_TIMESTAMP
                    WHERE id = :id
                ");
                $stmt->execute([':t' => $title, ':d' => $description, ':loc' => $location, ':cat' => $category, ':img' => $coverPath, ':st' => $status, ':id' => $projectId]);
            } else {
                $stmt = $db->prepare("
                    UPDATE projects 
                    SET title = :t, description = :d, location = :loc, category = :cat, status = :st, updated_at = CURRENT_TIMESTAMP
                    WHERE id = :id
                ");
                $stmt->execute([':t' => $title, ':d' => $description, ':loc' => $location, ':cat' => $category, ':st' => $status, ':id' => $projectId]);
            }
        } else {
            // Create
            $stmt = $db->prepare("
                INSERT INTO projects (title, description, location, category, image, status)
                VALUES (:t, :d, :loc, :cat, :img, :st)
            ");
            $stmt->execute([':t' => $title, ':d' => $description, ':loc' => $location, ':cat' => $category, ':img' => $coverPath ?: '', ':st' => $status]);
            $projectId = (int)$db->lastInsertId();
        }

        // Handle Multiple Gallery Images
        $uploadedCount = 0;
        if (!empty($_FILES['gallery_images']['name'])) {
            $names = is_array($_FILES['gallery_images']['name']) ? $_FILES['gallery_images']['name'] : [$_FILES['gallery_images']['name']];
            $types = is_array($_FILES['gallery_images']['type']) ? $_FILES['gallery_images']['type'] : [$_FILES['gallery_images']['type']];
            $tmpNames = is_array($_FILES['gallery_images']['tmp_name']) ? $_FILES['gallery_images']['tmp_name'] : [$_FILES['gallery_images']['tmp_name']];
            $errors = is_array($_FILES['gallery_images']['error']) ? $_FILES['gallery_images']['error'] : [$_FILES['gallery_images']['error']];
            $sizes = is_array($_FILES['gallery_images']['size']) ? $_FILES['gallery_images']['size'] : [$_FILES['gallery_images']['size']];

            $insertImg = $db->prepare("
                INSERT INTO project_images (project_id, image_path, image_alt, sort_order)
                VALUES (:pid, :path, :alt, :ord)
            ");

            $maxOrd = (int)$db->query("SELECT COALESCE(MAX(sort_order), -1) FROM project_images WHERE project_id = {$projectId}")->fetchColumn();

            for ($i = 0; $i < count($names); $i++) {
                if ($errors[$i] === UPLOAD_ERR_NO_FILE) continue;

                $fileData = [
                    'name' => $names[$i],
                    'type' => $types[$i],
                    'tmp_name' => $tmpNames[$i],
                    'error' => $errors[$i],
                    'size' => $sizes[$i],
                ];

                $up = handle_image_upload($fileData);
                if ($up['success']) {
                    $maxOrd++;
                    $insertImg->execute([
                        ':pid' => $projectId,
                        ':path' => $up['path'],
                        ':alt' => $title,
                        ':ord' => $maxOrd
                    ]);
                    $uploadedCount++;

                    // If cover is empty, assign first uploaded photo
                    if (empty($coverPath)) {
                        $checkCover = $db->query("SELECT image FROM projects WHERE id = {$projectId}")->fetchColumn();
                        if (empty($checkCover)) {
                            $db->exec("UPDATE projects SET image = '{$up['path']}' WHERE id = {$projectId}");
                        }
                    }
                }
            }
        }

        echo json_encode([
            'success' => true,
            'message' => 'Project saved successfully with ' . $uploadedCount . ' new photos.',
            'project_id' => $projectId
        ]);

    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
}
