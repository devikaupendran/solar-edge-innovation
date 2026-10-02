<?php

/**
 * Solar Edge Innovations - Dual Environment Database Provider
 * Works seamlessly in both:
 * 1. Live Production (Hostinger MySQL)
 * 2. Local Development (SQLite fallback if local MySQL is offline)
 */

function getDB(): PDO {
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $configFile = __DIR__ . '/config.php';
    $config = file_exists($configFile) ? require $configFile : [];

    $host    = (string)($config['db_host'] ?? 'localhost');
    $port    = (int)($config['db_port'] ?? 3306);
    $dbName  = (string)($config['db_name'] ?? 'u987815820_solar');
    $user    = (string)($config['db_user'] ?? 'u987815820_solar_edge_');
    $pass    = (string)($config['db_pass'] ?? '');
    $charset = (string)($config['db_charset'] ?? 'utf8mb4');

    // 1. Try MySQL connection first (Production & Local MySQL)
    if (!empty($dbName) && !empty($user)) {
        try {
            $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset={$charset}";
            $pdo = new PDO($dsn, $user, $pass, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::ATTR_TIMEOUT            => 2,
            ]);
        } catch (PDOException $e) {
            error_log("MySQL connection attempt failed: " . $e->getMessage());
            $pdo = null;
        }

        if ($pdo !== null) {
            // Run table auto-creation separately — a failure here must NOT kill the connection
            try {
                initMysqlTables($pdo);
            } catch (Exception $initErr) {
                error_log("MySQL table init warning: " . $initErr->getMessage());
            }
            return $pdo;
        }
    }

    // 2. Local Development Fallback: SQLite
    $serverHost = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'localhost';
    $isLocal = str_contains($serverHost, 'localhost') ||
               str_contains($serverHost, '127.0.0.1') ||
               php_sapi_name() === 'cli' ||
               php_sapi_name() === 'cli-server';

    if ($isLocal) {
        try {
            $sqlitePath = __DIR__ . '/database.sqlite';
            $pdo = new PDO("sqlite:" . $sqlitePath, null, null, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);

            $pdo->exec("PRAGMA foreign_keys = ON;");
            initLocalSqliteTables($pdo);

            return $pdo;
        } catch (Exception $sqle) {
            error_log("Local SQLite fallback failed: " . $sqle->getMessage());
        }
    }

    throw new RuntimeException("Database connection error. Please verify database credentials.");
}

/**
 * Initializes SQLite tables for local testing
 */
function initLocalSqliteTables(PDO $pdo): void {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL
        );

        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            location TEXT,
            category TEXT DEFAULT 'solar',
            image TEXT,
            status TEXT DEFAULT 'published',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL
        );

        CREATE TABLE IF NOT EXISTS project_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            image_path TEXT NOT NULL,
            image_alt TEXT,
            sort_order INTEGER DEFAULT 0,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS faqs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            category TEXT DEFAULT 'General',
            sort_order INTEGER DEFAULT 0,
            status TEXT DEFAULT 'published',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL
        );

        CREATE TABLE IF NOT EXISTS admin_tokens (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            admin_id INTEGER NOT NULL,
            token TEXT NOT NULL UNIQUE,
            name TEXT DEFAULT 'Admin API Token',
            expires_at DATETIME NOT NULL,
            last_used_at DATETIME,
            status TEXT DEFAULT 'active',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            deleted_at DATETIME NULL,
            FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
        );
    ");

    migrateSqliteTables($pdo);

    $count = (int)$pdo->query("SELECT COUNT(*) FROM admins")->fetchColumn();
    if ($count === 0) {
        $hash = password_hash('SolarEdge@2026!', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO admins (id, username, email, password) VALUES (1, 'admin', 'admin@solaredgeinnovation.in', :pass)");
        $stmt->execute([':pass' => $hash]);
    }

    // Seed default FAQs
    $faqCount = (int)$pdo->query("SELECT COUNT(*) FROM faqs")->fetchColumn();
    if ($faqCount === 0) {
        $defaultFaqs = [
            ['Do you offer free on-site solar inspections and feasibility surveys?', 'Yes! Our certified solar engineering specialists provide complimentary site surveys across Trivandrum, Kollam, and nearby regions across Kerala. We inspect your rooftop orientation, shading analysis, electrical load, and structure to calculate optimal solar yield and customized savings.', 'Residential Solar', 1],
            ['Can you help us apply for PM Surya Ghar Muft Bijli Yojana subsidies?', 'Absolutely. We handle end-to-end documentation, KSEB net-metering approvals, and national subsidy portal filings for the PM Surya Ghar Muft Bijli Yojana. Eligible residential rooftop customers can claim direct central government subsidies of up to ₹78,000.', 'Residential Solar', 2],
            ['How quickly does your team respond to consultation requests?', 'Our technical customer support team typically reviews all submitted inquiries and responds within 2 to 4 business hours. For urgent inquiries or immediate site visit bookings, you can also reach us directly via WhatsApp or phone at +91 95268 01406.', 'General', 3],
            ['What warranties and service assurances are provided with installations?', 'We provide tier-1 MNRE/ALMM approved solar modules with up to 25 to 27 years linear power performance warranty, 5 to 10 years inverter manufacturer warranty, and comprehensive post-installation maintenance and system monitoring support.', 'General', 4],
            ['Do you provide hybrid backup systems for locations with frequent power cuts?', 'Yes, our hybrid solar and inverter systems automatically switch between solar energy, battery backup, and the grid within milliseconds during blackouts, ensuring complete uninterrupted power for your lighting, fans, air conditioning, and IT equipment.', 'Inverters & Batteries', 5],
            ['How much rooftop area is required for a 3kW or 5kW solar plant?', 'Typically, a 1kW solar installation requires approximately 80 to 100 square feet of shadow-free rooftop space. Therefore, a standard 3kW residential system requires around 250 to 300 sq.ft., and a 5kW system requires approximately 450 to 500 sq.ft.', 'Residential Solar', 6],
            ['How does KSEB net metering work with on-grid solar systems?', 'With on-grid solar and a bi-directional KSEB net meter, excess solar power generated during peak daylight hours is exported back to the KSEB power grid. At night or during cloudy periods, you import energy as needed. You are only billed for the net units consumed, dramatically reducing or eliminating your bi-monthly electricity bill.', 'Solar', 7],
            ['Do you also provide CCTV security and electrical inverter backup solutions?', 'Yes, Solar Edge Innovation offers integrated smart living services including high-definition IP & HD CCTV surveillance systems, tubular battery backup solutions, solar water heaters, and energy-efficient lightning surge protection systems.', 'CCTV', 8],
        ];
        $stmtFaq = $pdo->prepare("INSERT INTO faqs (question, answer, category, sort_order, status) VALUES (:q, :a, :cat, :ord, 'published')");
        foreach ($defaultFaqs as $df) {
            $stmtFaq->execute([':q' => $df[0], ':a' => $df[1], ':cat' => $df[2], ':ord' => $df[3]]);
        }
    }
}

/**
 * Automatically creates MySQL tables on Hostinger.
 * IMPORTANT: PDO MySQL does NOT support multiple statements in one exec() call.
 * Each CREATE TABLE is executed in its own exec() call.
 */
function initMysqlTables(PDO $pdo): void {
    // Fast check — if admins table exists, ensure soft-delete migrations and return
    $check = $pdo->query("SHOW TABLES LIKE 'admins'")->fetch();
    if ($check) {
        migrateMysqlTables($pdo);
        return;
    }

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admins` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(100) NOT NULL UNIQUE,
            `email` VARCHAR(150) NOT NULL UNIQUE,
            `password` VARCHAR(255) NOT NULL,
            `status` ENUM('active', 'inactive', 'deleted') NOT NULL DEFAULT 'active',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            `deleted_at` TIMESTAMP NULL DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `projects` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(255) NOT NULL,
            `description` TEXT NULL,
            `location` VARCHAR(150) NULL,
            `category` VARCHAR(100) NULL,
            `image` VARCHAR(255) NULL,
            `status` ENUM('published', 'draft', 'deleted') NOT NULL DEFAULT 'published',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            `deleted_at` TIMESTAMP NULL DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `project_images` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `project_id` INT NOT NULL,
            `image_path` VARCHAR(255) NOT NULL,
            `image_alt` VARCHAR(255) NULL,
            `sort_order` INT NOT NULL DEFAULT 0,
            `status` ENUM('active', 'deleted') NOT NULL DEFAULT 'active',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `deleted_at` TIMESTAMP NULL DEFAULT NULL,
            INDEX `idx_project_id` (`project_id`),
            CONSTRAINT `fk_project_images_project`
                FOREIGN KEY (`project_id`)
                REFERENCES `projects` (`id`)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `faqs` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `question` TEXT NOT NULL,
            `answer` TEXT NOT NULL,
            `category` VARCHAR(100) NOT NULL DEFAULT 'General',
            `sort_order` INT NOT NULL DEFAULT 0,
            `status` ENUM('published', 'draft', 'deleted') NOT NULL DEFAULT 'published',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            `deleted_at` TIMESTAMP NULL DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admin_tokens` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `admin_id` INT NOT NULL,
            `token` VARCHAR(64) NOT NULL UNIQUE,
            `name` VARCHAR(100) NOT NULL DEFAULT 'Admin API Token',
            `expires_at` DATETIME NOT NULL,
            `last_used_at` DATETIME NULL,
            `status` ENUM('active', 'revoked', 'deleted') NOT NULL DEFAULT 'active',
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `deleted_at` TIMESTAMP NULL DEFAULT NULL,
            INDEX `idx_token` (`token`),
            INDEX `idx_admin_id` (`admin_id`),
            CONSTRAINT `fk_admin_tokens_admin`
                FOREIGN KEY (`admin_id`)
                REFERENCES `admins` (`id`)
                ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");

    migrateMysqlTables($pdo);

    // Seed default admin
    $count = (int)$pdo->query("SELECT COUNT(*) FROM admins")->fetchColumn();
    if ($count === 0) {
        $hash = '$2y$12$zc3DJeyouX4jETgZrpD1a.Ep4VEt8iMACMX4FRgEgW.xX7J6cUQui'; // SolarEdge@2026!
        $stmt = $pdo->prepare("INSERT INTO `admins` (`id`, `username`, `email`, `password`, `status`) VALUES (1, 'admin', 'admin@solaredgeinnovation.in', :pass, 'active')");
        $stmt->execute([':pass' => $hash]);
    }

    // Seed default FAQs
    $faqCount = (int)$pdo->query("SELECT COUNT(*) FROM `faqs`")->fetchColumn();
    if ($faqCount === 0) {
        $defaultFaqs = [
            ['Do you offer free on-site solar inspections and feasibility surveys?', 'Yes! Our certified solar engineering specialists provide complimentary site surveys across Trivandrum, Kollam, and nearby regions across Kerala. We inspect your rooftop orientation, shading analysis, electrical load, and structure to calculate optimal solar yield and customized savings.', 'Residential Solar', 1],
            ['Can you help us apply for PM Surya Ghar Muft Bijli Yojana subsidies?', 'Absolutely. We handle end-to-end documentation, KSEB net-metering approvals, and national subsidy portal filings for the PM Surya Ghar Muft Bijli Yojana. Eligible residential rooftop customers can claim direct central government subsidies of up to ₹78,000.', 'Residential Solar', 2],
            ['How quickly does your team respond to consultation requests?', 'Our technical customer support team typically reviews all submitted inquiries and responds within 2 to 4 business hours. For urgent inquiries or immediate site visit bookings, you can also reach us directly via WhatsApp or phone at +91 95268 01406.', 'General', 3],
            ['What warranties and service assurances are provided with installations?', 'We provide tier-1 MNRE/ALMM approved solar modules with up to 25 to 27 years linear power performance warranty, 5 to 10 years inverter manufacturer warranty, and comprehensive post-installation maintenance and system monitoring support.', 'General', 4],
            ['Do you provide hybrid backup systems for locations with frequent power cuts?', 'Yes, our hybrid solar and inverter systems automatically switch between solar energy, battery backup, and the grid within milliseconds during blackouts, ensuring complete uninterrupted power for your lighting, fans, air conditioning, and IT equipment.', 'Inverters & Batteries', 5],
            ['How much rooftop area is required for a 3kW or 5kW solar plant?', 'Typically, a 1kW solar installation requires approximately 80 to 100 square feet of shadow-free rooftop space. Therefore, a standard 3kW residential system requires around 250 to 300 sq.ft., and a 5kW system requires approximately 450 to 500 sq.ft.', 'Residential Solar', 6],
            ['How does KSEB net metering work with on-grid solar systems?', 'With on-grid solar and a bi-directional KSEB net meter, excess solar power generated during peak daylight hours is exported back to the KSEB power grid. At night or during cloudy periods, you import energy as needed. You are only billed for the net units consumed, dramatically reducing or eliminating your bi-monthly electricity bill.', 'Solar', 7],
            ['Do you also provide CCTV security and electrical inverter backup solutions?', 'Yes, Solar Edge Innovation offers integrated smart living services including high-definition IP & HD CCTV surveillance systems, tubular battery backup solutions, solar water heaters, and energy-efficient lightning surge protection systems.', 'CCTV', 8],
        ];
        $stmtFaq = $pdo->prepare("INSERT INTO `faqs` (`question`, `answer`, `category`, `sort_order`, `status`) VALUES (:q, :a, :cat, :ord, 'published')");
        foreach ($defaultFaqs as $df) {
            $stmtFaq->execute([':q' => $df[0], ':a' => $df[1], ':cat' => $df[2], ':ord' => $df[3]]);
        }
    }
}

/**
 * Ensures all MySQL tables have status and deleted_at columns for soft delete
 */
function migrateMysqlTables(PDO $pdo): void {
    // 1. admins
    try {
        $pdo->exec("ALTER TABLE `admins` ADD COLUMN `status` ENUM('active', 'inactive', 'deleted') NOT NULL DEFAULT 'active'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE `admins` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL");
    } catch (Exception $e) {}

    // 2. projects
    try {
        $pdo->exec("ALTER TABLE `projects` MODIFY COLUMN `status` ENUM('published', 'draft', 'deleted') NOT NULL DEFAULT 'published'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE `projects` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL");
    } catch (Exception $e) {}

    // 3. project_images
    try {
        $pdo->exec("ALTER TABLE `project_images` ADD COLUMN `status` ENUM('active', 'deleted') NOT NULL DEFAULT 'active'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE `project_images` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL");
    } catch (Exception $e) {}

    // 4. faqs
    try {
        $pdo->exec("ALTER TABLE `faqs` MODIFY COLUMN `status` ENUM('published', 'draft', 'deleted') NOT NULL DEFAULT 'published'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE `faqs` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL");
    } catch (Exception $e) {}

    // 5. admin_tokens
    try {
        $pdo->exec("ALTER TABLE `admin_tokens` ADD COLUMN `status` ENUM('active', 'revoked', 'deleted') NOT NULL DEFAULT 'active'");
    } catch (Exception $e) {}
    try {
        $pdo->exec("ALTER TABLE `admin_tokens` ADD COLUMN `deleted_at` TIMESTAMP NULL DEFAULT NULL");
    } catch (Exception $e) {}
}

/**
 * Ensures all SQLite tables have status and deleted_at columns for soft delete
 */
function migrateSqliteTables(PDO $pdo): void {
    $tables = [
        'admins' => [
            'status' => "TEXT DEFAULT 'active'",
            'deleted_at' => "DATETIME NULL"
        ],
        'projects' => [
            'status' => "TEXT DEFAULT 'published'",
            'deleted_at' => "DATETIME NULL"
        ],
        'project_images' => [
            'status' => "TEXT DEFAULT 'active'",
            'deleted_at' => "DATETIME NULL"
        ],
        'faqs' => [
            'status' => "TEXT DEFAULT 'published'",
            'deleted_at' => "DATETIME NULL"
        ],
        'admin_tokens' => [
            'status' => "TEXT DEFAULT 'active'",
            'deleted_at' => "DATETIME NULL"
        ]
    ];

    foreach ($tables as $table => $columns) {
        try {
            $colsStmt = $pdo->query("PRAGMA table_info({$table})");
            $existingCols = [];
            while ($row = $colsStmt->fetch(PDO::FETCH_ASSOC)) {
                $existingCols[] = $row['name'];
            }
            foreach ($columns as $col => $type) {
                if (!in_array($col, $existingCols, true)) {
                    $pdo->exec("ALTER TABLE {$table} ADD COLUMN {$col} {$type}");
                }
            }
        } catch (Exception $e) {}
    }
}
