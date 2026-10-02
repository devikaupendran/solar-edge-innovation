import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
    console.error('dist directory does not exist.');
    process.exit(1);
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        const entries = fs.readdirSync(src);
        for (const entry of entries) {
            // Skip sqlite database files and node_modules
            if (entry.endsWith('.sqlite') || entry === 'node_modules') continue;
            copyRecursive(path.join(src, entry), path.join(dest, entry));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy api, uploads, database.sql to dist
console.log('Copying backend files to dist/ for Hostinger deployment...');
copyRecursive(path.join(rootDir, 'api'), path.join(distDir, 'api'));
copyRecursive(path.join(rootDir, 'uploads'), path.join(distDir, 'uploads'));
if (fs.existsSync(path.join(rootDir, 'database.sql'))) {
    fs.copyFileSync(path.join(rootDir, 'database.sql'), path.join(distDir, 'database.sql'));
}

console.log('Successfully copied api, uploads, and database.sql to dist/!');
