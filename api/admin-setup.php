<?php

/**
 * Solar Edge Innovations - Database Setup & Health API
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

header('Content-Type: application/json; charset=UTF-8');

$admin = require_admin_session();

$db = getDB();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

$tablesToCheck = ['admins', 'projects', 'project_images', 'faqs', 'admin_tokens'];

if ($method === 'GET') {
    $tableStatus = [];
    foreach ($tablesToCheck as $tbl) {
        try {
            $count = (int)$db->query("SELECT COUNT(*) FROM {$tbl}")->fetchColumn();
            $tableStatus[$tbl] = [
                'exists' => true,
                'rows' => $count
            ];
        } catch (Exception $e) {
            $tableStatus[$tbl] = [
                'exists' => false,
                'rows' => 0,
                'error' => $e->getMessage()
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'driver' => $db->getAttribute(PDO::ATTR_DRIVER_NAME),
        'tables' => $tableStatus
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

if ($method === 'POST') {
    try {
        $sqlPath = __DIR__ . '/../database.sql';
        if (!file_exists($sqlPath)) {
            throw new Exception('database.sql file not found.');
        }

        $sql = file_get_contents($sqlPath);
        $db->exec($sql);

        echo json_encode([
            'success' => true,
            'message' => 'Database tables and initial records successfully verified/installed.'
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to initialize database.',
            'error' => $e->getMessage()
        ]);
    }
}
