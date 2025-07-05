import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const trashDir = path.join(projectRoot, '.trash');

// Ensure the .trash directory exists
if (!fs.existsSync(trashDir)) {
  fs.mkdirSync(trashDir, { recursive: true });
}

// Get the list of unused components from the previous analysis
const unusedComponentsFile = path.join(projectRoot, 'UNUSED_COMPONENTS.md');
if (!fs.existsSync(unusedComponentsFile)) {
  console.error('UNUSED_COMPONENTS.md not found. Please run the component analysis first.');
  process.exit(1);
}

// Read the unused components file
const content = fs.readFileSync(unusedComponentsFile, 'utf-8');
const lines = content.split('\n');

// Find the start and end of the unused components section
const unusedSectionStart = lines.findIndex(line => line.includes('## Unused Components'));
if (unusedSectionStart === -1) {
  console.error('Could not find "Unused Components" section in the file');
  process.exit(1);
}

// Find the end of the unused components section (look for the next section or end of file)
let unusedSectionEnd = lines.length;
for (let i = unusedSectionStart + 1; i < lines.length; i++) {
  if (lines[i].startsWith('## ')) {
    unusedSectionEnd = i;
    break;
  }
}

// Process each line in the unused components section
let movedCount = 0;
const skipped: string[] = [];

for (let i = unusedSectionStart + 1; i < unusedSectionEnd; i++) {
  const line = lines[i].trim();
  if (!line.startsWith('- ')) continue;

  // Extract the file path from the line
  const match = line.match(/\(([^)]+)\)/);
  if (!match || !match[1]) continue;

  const filePath = match[1].trim();
  
  // Skip if the path doesn't exist
  if (!fs.existsSync(filePath)) {
    skipped.push(`File not found: ${filePath}`);
    continue;
  }

  // Calculate the relative path from project root
  const relativePath = path.relative(projectRoot, filePath);
  const targetPath = path.join(trashDir, relativePath);
  
  // Create the target directory if it doesn't exist
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Skip if the target file already exists
  if (fs.existsSync(targetPath)) {
    skipped.push(`Target exists, skipped: ${relativePath}`);
    continue;
  }
  
  try {
    // Move the file
    fs.renameSync(filePath, targetPath);
    console.log(`Moved: ${relativePath}`);
    movedCount++;
    
    // If this is an index file, also move related files (like .module.css, .test.tsx, etc.)
    if (path.basename(filePath).startsWith('index.')) {
      const baseName = path.basename(filePath, path.extname(filePath));
      const dir = path.dirname(filePath);
      
      // Look for related files
      const relatedFiles = fs.readdirSync(dir).filter(file => {
        if (file === path.basename(filePath)) return false;
        const fileBase = path.basename(file, path.extname(file));
        return fileBase === baseName;
      });
      
      // Move related files
      for (const file of relatedFiles) {
        const src = path.join(dir, file);
        const dest = path.join(targetDir, file);
        
        if (!fs.existsSync(dest)) {
          fs.renameSync(src, dest);
          console.log(`  └─ Moved related: ${path.relative(projectRoot, src)}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error moving ${filePath}:`, error);
  }
}

// Print summary
console.log('\n=== Summary ===');
console.log(`Moved ${movedCount} files to .trash directory`);

if (skipped.length > 0) {
  console.log('\nSkipped files:');
  skipped.forEach(msg => console.log(`- ${msg}`));
}

console.log('\nDone! Unused components have been moved to the .trash directory.');
console.log('You can review them there and delete them permanently if not needed.');
