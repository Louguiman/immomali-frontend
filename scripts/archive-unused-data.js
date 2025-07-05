const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECT_ROOT = path.join(__dirname, "..");
const ARCHIVE_DIR = path.join(PROJECT_ROOT, "archive");

// List of unused data files from Knip output
const UNUSED_DATA_FILES = [
  "data/comfortPlace.ts",
  "data/comparePricing.ts",
  "data/find.tsx",
  "data/findProperties.ts",
  "data/gallery.ts",
  "data/menuData.ts",
  "data/service.ts",
  "data/testimonial.ts",
  "i18n/navigation.ts",
  "i18n/request.ts",
  "features/agent/agentApi.ts",
  "features/api/ads.api.ts",
  "features/api/complaints.api.ts",
  "features/api/permissions.api.ts",
  "features/api/roles.api.ts",
  "features/notifications/socket.ts",
  "utils/functions/currencyFormatter.ts",
  "utils/functions/dateFormatter.ts",
  "utils/functions/errors.ts",
  "utils/interface/complaint.interface.ts",
];

// Create archive directory if it doesn't exist
if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  console.log(`Created archive directory at: ${ARCHIVE_DIR}`);
}

// Function to move files to archive
function archiveFile(relativePath) {
  const sourcePath = path.join(PROJECT_ROOT, relativePath);
  const targetPath = path.join(ARCHIVE_DIR, relativePath);

  // Create target directory if it doesn't exist
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  try {
    // Skip if file doesn't exist
    if (!fs.existsSync(sourcePath)) {
      console.log(`Skipping non-existent file: ${relativePath}`);
      return;
    }

    // Use git mv to track the move in version control
    execSync(`git mv "${sourcePath}" "${targetPath}"`, { stdio: "inherit" });
    console.log(`Moved ${relativePath} to archive`);
  } catch (error) {
    console.error(`Error moving ${relativePath}:`, error);
  }
}

// Process all unused data files
console.log("Starting to archive unused data files...");
UNUSED_DATA_FILES.forEach((file) => {
  archiveFile(file);

  // Also look for related files (like .d.ts, .test.ts, etc.)
  const dir = path.dirname(file);
  const baseName = path.basename(file, path.extname(file));

  const possibleRelatedFiles = [
    path.join(dir, `${baseName}.d.ts`),
    path.join(dir, `${baseName}.test.ts`),
    path.join(dir, `${baseName}.spec.ts`),
  ];

  possibleRelatedFiles.forEach((relatedFile) => {
    if (fs.existsSync(path.join(PROJECT_ROOT, relatedFile))) {
      archiveFile(relatedFile);
    }
  });
});

console.log("\nArchiving of data files complete!");
console.log(`Check ${ARCHIVE_DIR} for archived files.`);
console.log("\nNext steps:");
console.log("1. Review the changes with: git status");
console.log("2. Test your application to ensure everything still works");
console.log(
  '3. Commit the changes: git commit -m "chore: archive unused data files"'
);
