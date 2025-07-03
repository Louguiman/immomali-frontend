import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const componentsDir = path.join(projectRoot, 'components');

// Function to find all component files
function findAllComponents(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other non-component directories
      if (!['node_modules', '.next', '.git', '.github', 'public'].includes(file)) {
        findAllComponents(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      // Convert to relative path from components directory
      const relativePath = path.relative(componentsDir, filePath).replace(/\\/g, '/');
      fileList.push(relativePath);
    }
  });
  
  return fileList;
}

// Function to find all imports in the project
function findAllImports() {
  const allImports = new Set<string>();
  
  function scanDirectoryForImports(dir: string) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other non-source directories
        if (!['node_modules', '.next', '.git', '.github', 'public'].includes(file)) {
          scanDirectoryForImports(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          // Find all imports from @/components
          const importMatches = content.matchAll(/from ['"]@\/components\/([^'"]+)['"]/g);
          
          for (const match of importMatches) {
            allImports.add(match[1]);
          }
        } catch (error) {
          console.error(`Error reading file ${filePath}:`, error);
        }
      }
    });
  }
  
  scanDirectoryForImports(projectRoot);
  return allImports;
}

// Main function to find unused components
function findUnusedComponents() {
  console.log('Scanning for all components...');
  const allComponents = findAllComponents(componentsDir);
  console.log(`Found ${allComponents.length} components`);
  
  console.log('Scanning for component imports...');
  const usedImports = findAllImports();
  console.log(`Found ${usedImports.size} unique component imports`);
  
  // Convert component paths to match import format (without extension)
  const componentPaths = allComponents.map(compPath => {
    // Remove file extension and index.tsx if present
    let cleanPath = compPath.replace(/\.(tsx|jsx)$/, '').replace(/\/index$/, '');
    return {
      fullPath: path.join(componentsDir, compPath),
      importPath: cleanPath
    };
  });
  
  // Find unused components
  const unusedComponents = componentPaths.filter(comp => !usedImports.has(comp.importPath));
  
  // Generate report
  const report = `# Unused Components Analysis

This report identifies components that are defined but not imported anywhere in the project.

## Unused Components (${unusedComponents.length} found)

${unusedComponents.map(comp => `- ${comp.importPath} (${comp.fullPath})`).join('\n')}

## Used Components (${componentPaths.length - unusedComponents.length} found)

${componentPaths
  .filter(comp => usedImports.has(comp.importPath))
  .map(comp => `- ${comp.importPath}`)
  .join('\n')}
`;
  
  // Write the report to a file
  fs.writeFileSync(path.join(projectRoot, 'UNUSED_COMPONENTS.md'), report);
  
  console.log('Analysis complete. Report saved to UNUSED_COMPONENTS.md');
  console.log(`Found ${unusedComponents.length} unused components out of ${componentPaths.length} total components`);
}

// Run the analysis
findUnusedComponents();
