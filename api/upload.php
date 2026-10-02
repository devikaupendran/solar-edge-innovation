<?php

/**
 * Solar Edge Innovations - Secure Project Image Upload Handler
 */

require_once __DIR__ . '/auth.php';

/**
 * Validates and saves an uploaded image file safely.
 *
 * @param array $file Single $_FILES item (e.g. $_FILES['image'] or element of $_FILES['images'])
 * @return array ['success' => bool, 'path' => string|null, 'error' => string|null, 'filename' => string|null]
 */
function handle_image_upload(array $file): array {
    $config = require __DIR__ . '/config.php';

    // 1. Check for basic PHP upload error
    if (!isset($file['error']) || is_array($file['error'])) {
        return ['success' => false, 'error' => 'Invalid upload parameters.'];
    }

    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errorMessages = [
            UPLOAD_ERR_INI_SIZE   => 'The uploaded file exceeds upload_max_filesize in php.ini.',
            UPLOAD_ERR_FORM_SIZE  => 'The uploaded file exceeds the MAX_FILE_SIZE directive.',
            UPLOAD_ERR_PARTIAL    => 'The uploaded file was only partially uploaded.',
            UPLOAD_ERR_NO_FILE    => 'No file was uploaded.',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder.',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk.',
            UPLOAD_ERR_EXTENSION  => 'A PHP extension stopped the file upload.',
        ];
        return ['success' => false, 'error' => $errorMessages[$file['error']] ?? 'Upload error.'];
    }

    // 2. Check file size
    $maxSize = $config['max_file_size'] ?? (5 * 1024 * 1024);
    if ($file['size'] > $maxSize) {
        $sizeMb = round($maxSize / (1024 * 1024));
        return ['success' => false, 'error' => "File size exceeds the limit of {$sizeMb} MB."];
    }

    // 3. Check MIME type via finfo
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($file['tmp_name']);

    $allowedMimes = [
        'image/jpeg' => 'jpg',
        'image/png'  => 'png',
        'image/webp' => 'webp',
    ];

    if (!isset($allowedMimes[$mimeType])) {
        return ['success' => false, 'error' => 'Invalid file format. Only JPG, PNG, and WebP images are permitted.'];
    }

    // 4. Verify image content using getimagesize (prevents polyglot files/scripts)
    $imageInfo = @getimagesize($file['tmp_name']);
    if ($imageInfo === false) {
        return ['success' => false, 'error' => 'Uploaded file is not a valid image.'];
    }

    // 5. Check extension matches MIME type
    $detectedExt = $allowedMimes[$mimeType];
    $originalExt = strtolower(pathinfo($file['name'] ?? '', PATHINFO_EXTENSION));
    
    // Normalize jpeg -> jpg
    if ($originalExt === 'jpeg') $originalExt = 'jpg';

    // Blacklist any dangerous extensions regardless of input
    $blacklisted = ['php', 'phtml', 'php3', 'php4', 'php5', 'php7', 'phps', 'html', 'htm', 'js', 'svg', 'exe', 'sh', 'cgi'];
    if (in_array($originalExt, $blacklisted, true)) {
        return ['success' => false, 'error' => 'Dangerous file type detected.'];
    }

    // 6. Ensure target directory exists
    $targetDir = rtrim($config['upload_dir'] ?? (__DIR__ . '/../uploads/projects/'), '/') . '/';
    if (!is_dir($targetDir)) {
        if (!mkdir($targetDir, 0755, true) && !is_dir($targetDir)) {
            return ['success' => false, 'error' => 'Failed to create upload destination directory.'];
        }
    }

    // 7. Generate a secure, unique, random filename
    $uniqueName = 'proj_' . date('Ymd_His') . '_' . bin2hex(random_bytes(6)) . '.' . $detectedExt;
    $destination = $targetDir . $uniqueName;

    // 8. Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $destination)) {
        return ['success' => false, 'error' => 'Failed to save uploaded file.'];
    }

    // Fix permissions so web server can read
    chmod($destination, 0644);

    $relativeUrl = '/uploads/projects/' . $uniqueName;

    return [
        'success' => true,
        'path' => $relativeUrl,
        'filename' => $uniqueName,
        'error' => null
    ];
}
