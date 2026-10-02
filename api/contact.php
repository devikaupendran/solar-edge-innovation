<?php

header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require __DIR__ . '/vendor/autoload.php';

// Load SMTP configuration
$config = require __DIR__ . '/config.php';

// Load Email Template
require __DIR__ . '/email-template.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);

    exit;
}

// Read JSON sent by React
$input = json_decode(
    file_get_contents('php://input'),
    true
);

// Get form fields
$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$service = trim($input['service'] ?? '');
$place = trim($input['place'] ?? '');
$district = trim($input['district'] ?? '');
$message = trim($input['message'] ?? '');

// Validate required fields
if (
    $name === '' ||
    $email === '' ||
    $phone === '' ||
    $service === '' ||
    $place === '' ||
    $district === '' ||
    $message === ''
) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields.'
    ]);

    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Please enter a valid email address.'
    ]);

    exit;
}

// Limit message length
if (strlen($message) > 5000) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Message is too long.'
    ]);

    exit;
}

// Limit name length
if (strlen($name) > 100) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Name is too long.'
    ]);

    exit;
}

// Limit phone length
if (strlen($phone) > 30) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Phone number is too long.'
    ]);

    exit;
}

// Limit service length
if (strlen($service) > 150) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Service name is too long.'
    ]);

    exit;
}

// Limit place length
if (strlen($place) > 100) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Place name is too long.'
    ]);

    exit;
}

// Limit district length
if (strlen($district) > 100) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'District name is too long.'
    ]);

    exit;
}

$mail = new PHPMailer(true);

try {

    // --------------------------------
    // SMTP CONFIGURATION
    // --------------------------------

    $mail->isSMTP();

    $mail->Host = $config['smtp_host'];
    $mail->SMTPAuth = true;

    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];

    // Hostinger SMTP - TLS / STARTTLS
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $config['smtp_port'];


    // --------------------------------
    // SENDER
    // --------------------------------

    $mail->setFrom(
        $config['from_email'],
        $config['from_name']
    );


    // --------------------------------
    // RECEIVER
    // --------------------------------

    $mail->addAddress(
        $config['to_email']
    );


    // --------------------------------
    // REPLY TO VISITOR
    // --------------------------------

    $mail->addReplyTo(
        $email,
        $name
    );


    // --------------------------------
    // EMAIL CONTENT
    // --------------------------------

    $mail->Subject = 'New Website Enquiry - ' . $service;

    $mail->isHTML(true);

    $mail->Body = buildContactEmail(
        $name,
        $email,
        $phone,
        $service,
        $place,
        $district,
        $message
    );


    // --------------------------------
    // SEND EMAIL
    // --------------------------------

    $mail->send();


    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.'
    ]);

} catch (Exception $e) {

    error_log("PHPMailer error: " . $mail->ErrorInfo);

    // Do NOT expose SMTP credentials or
    // internal PHPMailer errors to visitors.
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Unable to send your message. Please try again later.'
    ]);
}