<?php

/**
 * Solar Edge Innovations - Public Projects Gallery API
 * Returns published projects and their gallery images as JSON
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

// Handle preflight OPTIONS request
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

try {
    $db = getDB();

    // Optional category or specific ID filter
    $category = trim($_GET['category'] ?? '');
    $projectId = isset($_GET['id']) ? (int)$_GET['id'] : null;

    $sql = "SELECT id, title, description, location, category, image, created_at, updated_at 
            FROM projects 
            WHERE status = 'published'";
    $params = [];

    if ($category !== '') {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }

    if ($projectId !== null && $projectId > 0) {
        $sql .= " AND id = :id";
        $params[':id'] = $projectId;
    }

    $sql .= " ORDER BY id DESC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $rawProjects = $stmt->fetchAll();

    // Prepare statement for gallery images
    $imgStmt = $db->prepare("
        SELECT image_path, image_alt, sort_order 
        FROM project_images 
        WHERE project_id = :pid AND (status IS NULL OR status != 'deleted')
        ORDER BY sort_order ASC, id ASC
    ");

    $projects = [];

    foreach ($rawProjects as $rp) {
        $pid = (int)$rp['id'];
        $imgStmt->execute([':pid' => $pid]);
        $galleryRows = $imgStmt->fetchAll();

        $images = [];
        foreach ($galleryRows as $grow) {
            if (!empty($grow['image_path'])) {
                $images[] = $grow['image_path'];
            }
        }

        $coverImage = $rp['image'] ?? '';
        
        // If cover_image is set but not in images array, prepend it
        if (!empty($coverImage) && !in_array($coverImage, $images, true)) {
            array_unshift($images, $coverImage);
        }

        // If cover_image is empty, fallback to first gallery image
        if (empty($coverImage) && !empty($images)) {
            $coverImage = $images[0];
        }

        $projects[] = [
            'id' => $pid,
            'title' => $rp['title'],
            'description' => $rp['description'] ?? '',
            'location' => $rp['location'] ?? '',
            'category' => $rp['category'] ?? 'Solar Installation',
            'cover_image' => $coverImage,
            'images' => $images,
            'created_at' => $rp['created_at'] ?? null
        ];
    }

    echo json_encode([
        'success' => true,
        'projects' => $projects
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to fetch projects.',
        'error' => $e->getMessage(),
        'projects' => []
    ]);
}
