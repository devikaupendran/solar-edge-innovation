<?php

/**
 * Solar Edge Innovations - Public FAQs API
 * Returns published FAQs as JSON
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS request
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/db.php';

try {
    $db = getDB();

    $category = trim($_GET['category'] ?? '');

    $sql = "SELECT id, question, answer, category, sort_order, created_at 
            FROM faqs 
            WHERE status = 'published'";
    $params = [];

    if ($category !== '') {
        $sql .= " AND category = :category";
        $params[':category'] = $category;
    }

    $sql .= " ORDER BY sort_order ASC, id ASC";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $rawFaqs = $stmt->fetchAll();

    $faqs = [];
    foreach ($rawFaqs as $f) {
        $faqs[] = [
            'id' => (int)$f['id'],
            'question' => $f['question'],
            'answer' => $f['answer'],
            'category' => $f['category'] ?? 'General',
            'sort_order' => (int)$f['sort_order']
        ];
    }

    echo json_encode([
        'success' => true,
        'faqs' => $faqs
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to fetch FAQs.',
        'error' => $e->getMessage(),
        'faqs' => []
    ]);
}
