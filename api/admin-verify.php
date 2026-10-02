<?php

/**
 * Solar Edge Innovations - Verify Admin Session Endpoint
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

header('Content-Type: application/json; charset=UTF-8');

$admin = get_authenticated_admin();

if ($admin) {
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'admin' => $admin
    ], JSON_UNESCAPED_SLASHES);
} else {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'authenticated' => false,
        'message' => 'Unauthorized.'
    ], JSON_UNESCAPED_SLASHES);
}
