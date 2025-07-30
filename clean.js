const fs = require('fs');
const path = require('path');

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/<li>\s*<a[^>]*class=["']gitbook-link["'][\s\S]*?<\/a>\s*<\/li>/gi, '');
            fs.writeFileSync(fullPath, content);
        }
    }
}

walk('_book');
