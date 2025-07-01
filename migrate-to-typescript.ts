import fs from "fs";
import path from "path";

const EXCLUDE_DIRS = ["node_modules", ".next", ".vercel", "public", ".git"];

function shouldExclude(filePath: string) {
  return EXCLUDE_DIRS.some((dir) =>
    filePath.includes(path.sep + dir + path.sep)
  );
}

function migrateDir(dir: string) {
  fs.readdirSync(dir).forEach((file: string) => {
    const fullPath = path.join(dir, file);
    if (shouldExclude(fullPath)) return;

    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      migrateDir(fullPath);
    } else if (stat.isFile()) {
      if (file.endsWith(".jsx")) {
        const newPath = fullPath.replace(/\.jsx$/, ".tsx");
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      } else if (file.endsWith(".js")) {
        // Skip config files
        if (
          /(next\.config\.js|jsconfig\.json|\.eslintrc\.js|babel\.config\.js)$/.test(
            file
          )
        )
          return;
        const newPath = fullPath.replace(/\.js$/, ".ts");
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    }
  });
}

// Start from project root
migrateDir(process.cwd());
