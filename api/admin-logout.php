<?php

/**
 * Solar Edge Innovations - Admin Logout Endpoint
 * Clears and destroys the PHP session, and expires session cookies
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

header('Content-Type: application/json; charset=UTF-8');

// 1. Clear session variables
$_SESSION = [];

// 2. Expire session cookie
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}

// 3. Expire legacy solar_admin_token cookie if present
if (isset($_COOKIE['solar_admin_token'])) {
    setcookie('solar_admin_token', '', time() - 86400, '/');
}

// 4. Destroy server session
if (session_status() === PHP_SESSION_ACTIVE) {
    session_destroy();
}

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully.'
], JSON_UNESCAPED_SLASHES);
