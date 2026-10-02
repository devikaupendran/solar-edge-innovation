<?php

/**
 * Solar Edge Innovations - Secure PHP Session Authentication
 * Pure HttpOnly Secure Session Cookie Authentication
 */

$isLocalDev = (isset($_SERVER['HTTP_HOST']) && (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false));
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ||
           (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ||
           (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) ||
           !$isLocalDev;

if (session_status() === PHP_SESSION_NONE) {
    // Enforce HttpOnly, Secure, SameSite=Lax on the PHP session cookie
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'domain' => '',
        'secure' => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    ini_set('session.cookie_httponly', '1');
    ini_set('session.use_only_cookies', '1');
    if ($isHttps) {
        ini_set('session.cookie_secure', '1');
    }
    session_start();
}

/**
 * Universal CORS and credentials headers for session-cookie support
 */
function send_auth_cors_headers(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = [
        'https://solaredgeinnovations.in',
        'https://www.solaredgeinnovations.in',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:3000'
    ];

    if (in_array($origin, $allowed, true)) {
        header("Access-Control-Allow-Origin: {$origin}");
    } elseif (!empty($origin)) {
        header("Access-Control-Allow-Origin: {$origin}");
    } else {
        header('Access-Control-Allow-Origin: https://solaredgeinnovations.in');
    }

    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
    header('Access-Control-Max-Age: 86400');

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

require_once __DIR__ . '/db.php';

/**
 * Check if admin is logged in via PHP session
 */
function is_admin_logged_in(): bool {
    return !empty($_SESSION['admin_id']);
}

/**
 * Get current authenticated admin session data
 */
function get_authenticated_admin(): ?array {
    if (!empty($_SESSION['admin_id'])) {
        return [
            'id' => (int)$_SESSION['admin_id'],
            'username' => $_SESSION['admin_username'] ?? 'admin',
            'email' => $_SESSION['admin_email'] ?? ''
        ];
    }
    return null;
}

/**
 * Guard: Enforce valid admin PHP session on protected APIs
 */
function require_admin_session(): array {
    if (empty($_SESSION['admin_id'])) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized.'
        ], JSON_UNESCAPED_SLASHES);
        exit;
    }

    return [
        'id' => (int)$_SESSION['admin_id'],
        'username' => $_SESSION['admin_username'] ?? 'admin',
        'email' => $_SESSION['admin_email'] ?? ''
    ];
}
