const fs = require('fs');
const path = require('path');

const baiduTongji = `<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a8620f6cad15d24a9fa7554e3496225f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
`;

function walk(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            content = content.replace(/<li>\s*<a[^>]*class=["']gitbook-link["'][\s\S]*?<\/a>\s*<\/li>/gi, '');
            content = content.replace('</head>', baiduTongji + '\n</head>');
            fs.writeFileSync(fullPath, content);
        }
    }
}

walk('_book');
