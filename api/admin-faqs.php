<?php

/**
 * Solar Edge Innovations - Admin FAQs Management API
 * Full CRUD for website FAQs
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

header('Content-Type: application/json; charset=UTF-8');

$admin = require_admin_session();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    try {
        $stmt = $db->query("
            SELECT id, question, answer, category, 
                   sort_order AS display_order, 
                   (CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS is_active, 
                   status,
                   created_at, updated_at
            FROM faqs
            WHERE (status IS NULL OR status != 'deleted')
            ORDER BY sort_order ASC, id ASC
        ");
        $faqs = $stmt->fetchAll();

        foreach ($faqs as &$f) {
            $f['id'] = (int)$f['id'];
            $f['display_order'] = (int)$f['display_order'];
            $f['is_active'] = (bool)$f['is_active'];
        }

        echo json_encode([
            'success' => true,
            'count' => count($faqs),
            'data' => $faqs
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to retrieve FAQs.',
            'error' => $e->getMessage()
        ]);
    }
    exit;
}

if ($method === 'POST') {
    $rawBody = file_get_contents('php://input');
    $input = json_decode($rawBody, true) ?: $_POST;
    $action = $input['action'] ?? 'create';

    try {
        if ($action === 'create') {
            $question = trim($input['question'] ?? '');
            $answer = trim($input['answer'] ?? '');
            $category = trim($input['category'] ?? 'General');
            $displayOrder = (int)($input['display_order'] ?? 0);
            $status = (!empty($input['is_active'])) ? 'published' : 'draft';

            if (empty($question) || empty($answer)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Question and answer are required.']);
                exit;
            }

            $stmt = $db->prepare("
                INSERT INTO faqs (question, answer, category, sort_order, status)
                VALUES (:q, :a, :cat, :ord, :stat)
            ");
            $stmt->execute([
                ':q' => $question,
                ':a' => $answer,
                ':cat' => $category,
                ':ord' => $displayOrder,
                ':stat' => $status
            ]);

            $newId = (int)$db->lastInsertId();
            echo json_encode([
                'success' => true,
                'message' => 'FAQ created successfully.',
                'id' => $newId
            ]);
            exit;
        }

        if ($action === 'update') {
            $id = (int)($input['id'] ?? 0);
            $question = trim($input['question'] ?? '');
            $answer = trim($input['answer'] ?? '');
            $category = trim($input['category'] ?? 'General');
            $displayOrder = (int)($input['display_order'] ?? 0);
            $status = (!empty($input['is_active'])) ? 'published' : 'draft';

            if ($id <= 0 || empty($question) || empty($answer)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Valid FAQ ID, question, and answer are required.']);
                exit;
            }

            $stmt = $db->prepare("
                UPDATE faqs
                SET question = :q, answer = :a, category = :cat, sort_order = :ord, status = :stat, updated_at = CURRENT_TIMESTAMP
                WHERE id = :id
            ");
            $stmt->execute([
                ':id' => $id,
                ':q' => $question,
                ':a' => $answer,
                ':cat' => $category,
                ':ord' => $displayOrder,
                ':stat' => $status
            ]);

            echo json_encode([
                'success' => true,
                'message' => 'FAQ updated successfully.'
            ]);
            exit;
        }

        if ($action === 'toggle_status') {
            $id = (int)($input['id'] ?? 0);
            $status = (!empty($input['is_active'])) ? 'published' : 'draft';

            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Valid FAQ ID is required.']);
                exit;
            }

            $stmt = $db->prepare("UPDATE faqs SET status = :stat, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
            $stmt->execute([':id' => $id, ':stat' => $status]);

            echo json_encode([
                'success' => true,
                'message' => 'FAQ status updated.'
            ]);
            exit;
        }

        if ($action === 'delete') {
            $id = (int)($input['id'] ?? 0);
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Valid FAQ ID is required.']);
                exit;
            }

            $stmt = $db->prepare("UPDATE faqs SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP WHERE id = :id");
            $stmt->execute([':id' => $id]);

            echo json_encode([
                'success' => true,
                'message' => 'FAQ deleted successfully.'
            ]);
            exit;
        }

        if ($action === 'restore') {
            $id = (int)($input['id'] ?? 0);
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Valid FAQ ID is required.']);
                exit;
            }

            $stmt = $db->prepare("UPDATE faqs SET status = 'published', deleted_at = NULL WHERE id = :id");
            $stmt->execute([':id' => $id]);

            echo json_encode([
                'success' => true,
                'message' => 'FAQ restored successfully.'
            ]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Unsupported action.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Operation failed.',
            'error' => $e->getMessage()
        ]);
    }
}
