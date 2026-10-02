<?php

/**
 * Solar Edge Innovations - Database Auto-Setup Script
 * Access via browser: https://solaredgeinnovations.in/api/setup-database.php
 * Verifies and initializes MySQL tables on Hostinger
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

try {
    $db = getDB();

    // Run table initialization and soft-delete migrations
    if (function_exists('initMysqlTables')) {
        initMysqlTables($db);
    }
    $driver = $db->getAttribute(PDO::ATTR_DRIVER_NAME);
    if ($driver === 'mysql' && function_exists('migrateMysqlTables')) {
        migrateMysqlTables($db);
    } elseif ($driver === 'sqlite' && function_exists('migrateSqliteTables')) {
        migrateSqliteTables($db);
    }

    // Check which tables exist
    $tables = [];
    $tableNames = ['admins', 'projects', 'project_images', 'faqs', 'admin_tokens'];
    foreach ($tableNames as $t) {
        try {
            $stmt = $db->query("SELECT COUNT(*) FROM `{$t}`");
            $count = (int)$stmt->fetchColumn();
            $tables[$t] = [
                'exists' => true,
                'rows' => $count
            ];
        } catch (Exception $te) {
            $tables[$t] = [
                'exists' => false,
                'error' => $te->getMessage()
            ];
        }
    }

    echo json_encode([
        'success' => true,
        'message' => 'Database tables verified successfully on Hostinger MySQL!',
        'database' => 'u987815820_solar',
        'tables' => $tables,
        'admin_credentials' => [
            'username' => 'admin',
            'email' => 'admin@solaredgeinnovation.in',
            'password_note' => 'SolarEdge@2026!'
        ]
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database setup failed.',
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
}
