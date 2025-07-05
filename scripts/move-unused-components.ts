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

// Parse the UNUSED_COMPONENTS.md file to get the list of unused components
function getUnusedComponents(): string[] {
  const unusedComponentsFile = path.join(projectRoot, 'UNUSED_COMPONENTS.md');
  if (!fs.existsSync(unusedComponentsFile)) {
    console.error('UNUSED_COMPONENTS.md not found. Please run the component analysis first.');
    return [];
  }

  const content = fs.readFileSync(unusedComponentsFile, 'utf-8');
  const lines = content.split('\n');
  const componentPaths: string[] = [];
  
  // Find the start of the unused components section
  const unusedSectionStart = lines.findIndex(line => line.includes('## Unused Components'));
  if (unusedSectionStart === -1) {
    console.error('Could not find "Unused Components" section in the file');
    return [];
  }
  
  // Find the end of the unused components section
  const nextSectionStart = lines.slice(unusedSectionStart + 1).findIndex(line => line.startsWith('## '));
  const unusedSectionEnd = nextSectionStart === -1 ? lines.length : unusedSectionStart + nextSectionStart + 1;
  
  // Extract file paths from the markdown list items in the unused section
  for (let i = unusedSectionStart + 1; i < unusedSectionEnd; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('- ')) continue;
    
    // Extract the path from the line
    const pathMatch = line.match(/\(([^)]+)\)/);
    if (pathMatch && pathMatch[1]) {
      // Convert Windows path to forward slashes for consistency
      const normalizedPath = pathMatch[1].replace(/\\/g, '/');
      componentPaths.push(normalizedPath);
    }
  }
  
  return componentPaths;
}

// Move a file to the trash directory, preserving its relative path
function moveToTrash(filePath: string): void {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return;
    }

    // Calculate the relative path from project root
    const relativePath = path.relative(projectRoot, filePath);
    const targetPath = path.join(trashDir, relativePath);
    
    // Create the target directory if it doesn't exist
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Check if the target file already exists
    if (fs.existsSync(targetPath)) {
      console.warn(`Target file already exists, skipping: ${targetPath}`);
      return;
    }
    
    // Move the file
    fs.renameSync(filePath, targetPath);
    console.log(`Moved: ${relativePath}`);
    
    // If this is an index file, also move related files (like .module.css, .test.tsx, etc.)
    if (path.basename(filePath).startsWith('index.')) {
      const baseName = path.basename(filePath, path.extname(filePath));
      const dir = path.dirname(filePath);
      
      // Look for related files
      const relatedFiles = fs.readdirSync(dir).filter(file => {
        const fileBase = path.basename(file, path.extname(file));
        return fileBase === baseName && file !== path.basename(filePath);
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

// Main function
async function main() {
  console.log('Moving unused components to .trash directory...');
  
  const unusedComponents = getUnusedComponents();
  
  if (unusedComponents.length === 0) {
    console.log('No unused components found.');
    return;
  }
  
  console.log(`Found ${unusedComponents.length} unused components.`);
  
  // Move each unused component
  for (const componentPath of unusedComponents) {
    if (!componentPath) continue;
    
    // Handle paths with line numbers (from the markdown)
    const cleanPath = componentPath.split(':')[0];
    
    if (!cleanPath) {
      console.warn(`Invalid path in component: ${componentPath}`);
      continue;
    }
    
    // Convert to absolute path if it's not already
    const absolutePath = path.isAbsolute(cleanPath) 
      ? cleanPath 
      : path.join(projectRoot, cleanPath);
    
    // Normalize the path for the current OS
    const normalizedPath = path.normalize(absolutePath);
    
    // Skip if the path doesn't exist
    if (!fs.existsSync(normalizedPath)) {
      console.warn(`File not found: ${normalizedPath}`);
      continue;
    }
    
    moveToTrash(normalizedPath);
  }
  
  console.log('\nDone! Unused components have been moved to the .trash directory.');
  console.log('You can review them there and delete them permanently if not needed.');
}

// Run the script
main().catch(console.error);
