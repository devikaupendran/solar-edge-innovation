<?php

/**
 * Solar Edge Innovations - Admin API Tokens Management Endpoint
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

$admin = require_admin_session();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    try {
        $stmt = $db->query("
            SELECT t.id, t.admin_id, t.name, t.token, t.last_used_at, t.expires_at, t.created_at,
                   a.username, a.email
            FROM admin_tokens t
            JOIN admins a ON t.admin_id = a.id
            WHERE (t.status IS NULL OR t.status != 'deleted')
            ORDER BY t.created_at DESC
        ");
        $tokens = $stmt->fetchAll();

        $now = time();
        foreach ($tokens as &$t) {
            $t['id'] = (int)$t['id'];
            $t['admin_id'] = (int)$t['admin_id'];
            $expTime = strtotime($t['expires_at'] ?? '2000-01-01');
            $t['is_expired'] = ($expTime <= $now);
            $t['masked_token'] = substr($t['token'], 0, 8) . '...' . substr($t['token'], -8);
        }

        echo json_encode([
            'success' => true,
            'count' => count($tokens),
            'current_admin' => [
                'id' => (int)($admin['id'] ?? 1),
                'username' => $admin['username'] ?? 'admin',
                'email' => $admin['email'] ?? 'admin@solaredgeinnovation.in',
                'role' => 'Master Administrator',
                'login_time' => date('Y-m-d H:i:s'),
                'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
            ],
            'sessions' => $tokens,
            'data' => $tokens
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to load sessions.', 'error' => $e->getMessage()]);
    }
    exit;
}

if ($method === 'POST') {
    $rawBody = file_get_contents('php://input');
    $input = json_decode($rawBody, true) ?: $_POST;
    $action = $input['action'] ?? 'create';

    try {
        if ($action === 'create') {
            $name = trim($input['name'] ?? 'Admin API Access');
            $validDays = max(1, min(365, (int)($input['valid_days'] ?? 30)));
            $adminId = (int)($admin['id'] ?? 1);

            $tokenData = generate_admin_token($adminId, $name, $validDays);

            echo json_encode([
                'success' => true,
                'message' => 'New API token generated successfully.',
                'token' => $tokenData['token'],
                'name' => $tokenData['name'],
                'expires_at' => $tokenData['expires_at'],
                'token_type' => 'Bearer'
            ]);
            exit;
        }

        if ($action === 'clear_all') {
            $stmt = $db->prepare("UPDATE admin_tokens SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP WHERE admin_id = :aid");
            $stmt->execute([':aid' => (int)($admin['id'] ?? 1)]);
            echo json_encode([
                'success' => true,
                'message' => 'All past session records cleared successfully.'
            ]);
            exit;
        }

        if ($action === 'delete' || $action === 'revoke') {
            $id = (int)($input['id'] ?? 0);
            if ($id <= 0) {
                http_response_code(400);
                echo json_encode(['success' => false, 'message' => 'Valid session ID is required.']);
                exit;
            }

            $stmt = $db->prepare("UPDATE admin_tokens SET status = 'deleted', deleted_at = CURRENT_TIMESTAMP WHERE id = :id");
            $stmt->execute([':id' => $id]);

            echo json_encode([
                'success' => true,
                'message' => 'Token revoked and soft-deleted successfully.'
            ]);
            exit;
        }

        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Unsupported action.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Operation failed.', 'error' => $e->getMessage()]);
    }
}
