const fs = require('fs');
const path = require('path');

const EXCLUDE_DIRS = ['node_modules', '.next', '.vercel', 'public', '.git'];
const JS_EXTENSIONS = ['.js', '.jsx'];

function shouldExclude(filePath) {
  return EXCLUDE_DIRS.some(dir => filePath.includes(path.sep + dir + path.sep));
}

function migrateDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (shouldExclude(fullPath)) return;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      migrateDir(fullPath);
    } else if (stat.isFile()) {
      if (file.endsWith('.jsx')) {
        const newPath = fullPath.replace(/\.jsx$/, '.tsx');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      } else if (file.endsWith('.js')) {
        // Skip config files
        if (/(next\.config\.js|jsconfig\.json|\.eslintrc\.js|babel\.config\.js)$/.test(file)) return;
        const newPath = fullPath.replace(/\.js$/, '.ts');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    }
  });
}

// Start from project root
migrateDir(process.cwd());