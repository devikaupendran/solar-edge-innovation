<?php

/**
 * Solar Edge Innovations - Admin Stats & Health API
 */

require_once __DIR__ . '/auth.php';
send_auth_cors_headers();

header('Content-Type: application/json; charset=UTF-8');

$admin = require_admin_session();

$db = getDB();

try {
    // 1. Projects stats
    $totalProjects = (int)$db->query("SELECT COUNT(*) FROM projects WHERE (status IS NULL OR status != 'deleted')")->fetchColumn();
    $activeProjects = (int)$db->query("SELECT COUNT(*) FROM projects WHERE status = 'published'")->fetchColumn();

    // 2. Images stats
    $totalImages = (int)$db->query("SELECT COUNT(*) FROM project_images WHERE (status IS NULL OR status != 'deleted')")->fetchColumn();

    // 3. FAQs stats
    $totalFaqs = (int)$db->query("SELECT COUNT(*) FROM faqs WHERE (status IS NULL OR status != 'deleted')")->fetchColumn();
    $activeFaqs = (int)$db->query("SELECT COUNT(*) FROM faqs WHERE status = 'published'")->fetchColumn();

    // 4. Tokens stats
    $activeTokens = (int)$db->query("SELECT COUNT(*) FROM admin_tokens WHERE expires_at > CURRENT_TIMESTAMP AND (status IS NULL OR status != 'deleted')")->fetchColumn();

    // 5. Recent projects
    $stmtRecent = $db->query("SELECT id, title, category, image AS cover_image, (CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS is_active, created_at FROM projects WHERE (status IS NULL OR status != 'deleted') ORDER BY id DESC LIMIT 5");
    $recentProjects = $stmtRecent->fetchAll();

    // 6. Database driver detection
    $driverName = $db->getAttribute(PDO::ATTR_DRIVER_NAME);

    echo json_encode([
        'success' => true,
        'stats' => [
            'total_projects' => $totalProjects,
            'active_projects' => $activeProjects,
            'total_images' => $totalImages,
            'total_faqs' => $totalFaqs,
            'active_faqs' => $activeFaqs,
            'active_tokens' => $activeTokens,
            'driver' => $driverName,
            'upload_dir_writable' => is_writable(__DIR__ . '/../uploads/projects/'),
            'admin_user' => $admin['username'] ?? 'admin'
        ],
        'recent_projects' => $recentProjects
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error querying stats.', 'error' => $e->getMessage()]);
}
