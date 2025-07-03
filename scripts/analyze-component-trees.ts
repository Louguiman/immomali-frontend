import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const appDir = path.join(projectRoot, 'app');
const componentsDir = path.join(projectRoot, 'components');

interface ComponentNode {
  name: string;
  path: string;
  children: ComponentNode[];
  isPage: boolean;
  imports: string[];
}

interface RouteAnalysis {
  route: string;
  componentTree: ComponentNode;
  allComponents: Set<string>;
}

// Cache for parsed components to avoid re-processing
const componentCache = new Map<string, ComponentNode>();

// Track all components and their usages
const componentUsages = new Map<string, Set<string>>();

// Get all TypeScript/JavaScript files in a directory
function getSourceFiles(dir: string): string[] {
  const files: string[] = [];
  
  function scanDirectory(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip node_modules and other non-source directories
        if (!['node_modules', '.next', '.git', '.github', 'public'].includes(entry.name)) {
          scanDirectory(fullPath);
        }
      } else if (entry.name.match(/\.(tsx|jsx|ts|js)$/)) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// Parse a file and extract component information
function parseComponentFile(filePath: string): ComponentNode | null {
  // Use cached result if available
  const cached = componentCache.get(filePath);
  if (cached) return cached;

  // Skip directories
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  const imports: string[] = [];
  const componentName = path.basename(filePath, path.extname(filePath));
  const isPage = filePath.includes('/page.') && filePath.includes('app/');

  // Simple regex to find imports (for now)
  const importRegex = /from\s+['"](@?\/?(?:\.{1,2}\/)*[^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];
    
    // Resolve relative paths
    if (importPath.startsWith('@/')) {
      importPath = path.join(projectRoot, importPath.replace('@/', ''));
    } else if (importPath.startsWith('.')) {
      importPath = path.resolve(path.dirname(filePath), importPath);
    }
    
    // Only track local component imports
    if (importPath.startsWith(projectRoot)) {
      imports.push(importPath);
    }
  }

  const componentNode: ComponentNode = {
    name: componentName,
    path: filePath,
    children: [],
    isPage,
    imports
  };

  // Cache the result
  componentCache.set(filePath, componentNode);
  
  return componentNode;
}

// Build a component tree starting from a root component
function buildComponentTree(rootPath: string, depth = 0, visited = new Set<string>()): ComponentNode | null {
  // Prevent infinite recursion and check for valid paths
  if (visited.has(rootPath) || !fs.existsSync(rootPath)) {
    return null;
  }
  visited.add(rootPath);

  // If it's a directory, try to find an index file
  if (fs.statSync(rootPath).isDirectory()) {
    const possibleFiles = ['index.tsx', 'index.jsx', 'index.ts', 'index.js'];
    for (const file of possibleFiles) {
      const indexPath = path.join(rootPath, file);
      if (fs.existsSync(indexPath)) {
        const component = buildComponentTree(indexPath, depth, new Set(visited));
        if (component) return component;
      }
    }
    return null;
  }

  // Process the file
  const component = parseComponentFile(rootPath);
  if (!component) return null;

  // Process all imports to build the tree
  for (const importPath of component.imports) {
    // Try different file extensions
    const possiblePaths = [
      importPath,
      `${importPath}.tsx`,
      `${importPath}.jsx`,
      `${importPath}/index.tsx`,
      `${importPath}/index.jsx`,
      path.join(importPath, 'index.tsx'),
      path.join(importPath, 'index.jsx'),
    ];

    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath) && !possiblePath.includes('node_modules')) {
        const childComponent = buildComponentTree(possiblePath, depth + 1, new Set(visited));
        if (childComponent) {
          component.children.push(childComponent);
          
          // Track component usage
          if (!componentUsages.has(childComponent.path)) {
            componentUsages.set(childComponent.path, new Set());
          }
          componentUsages.get(childComponent.path)?.add(component.path);
        }
        break;
      }
    }
  }

  return component;
}

// Generate a visual representation of the component tree
function generateTreeVisualization(node: ComponentNode, depth = 0): string {
  const indent = '  '.repeat(depth);
  let result = `${indent}├─ ${node.name}${node.isPage ? ' (PAGE)' : ''}\n`;
  
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    const isLast = i === node.children.length - 1;
    const childIndent = indent + (isLast ? '  ' : '│ ');
    
    result += generateTreeVisualization(child, depth + 1);
  }
  
  return result;
}

// Analyze a specific route
function analyzeRoute(routePath: string): RouteAnalysis | null {
  // Convert route to possible file paths
  const possiblePaths = [
    path.join(appDir, '[locale]', '(admin)', `${routePath}/page.tsx`),
    path.join(appDir, '[locale]', '(admin)', `${routePath}/page.jsx`),
    path.join(appDir, '[locale]', '(admin)', routePath, 'index.tsx'),
    path.join(appDir, '[locale]', '(admin)', routePath, 'index.jsx'),
    path.join(appDir, '[locale]', '(admin)', routePath)
  ];
  
  // Find the first valid path
  let filePath = '';
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      filePath = possiblePath;
      break;
    }
  }
  
  if (!filePath) {
    console.warn(`Could not find component for route: ${routePath}`);
    return null;
  }

  console.log(`Analyzing route: ${routePath}`);
  
  const componentTree = buildComponentTree(filePath);
  if (!componentTree) return null;
  
  // Collect all unique components in the tree
  const allComponents = new Set<string>();
  function collectComponents(node: ComponentNode) {
    allComponents.add(node.path);
    node.children.forEach(collectComponents);
  }
  collectComponents(componentTree);
  
  return {
    route: routePath,
    componentTree,
    allComponents
  };
}

// Main function to analyze all routes
async function analyzeAllRoutes() {
  const routes = [
    // Dashboard Routes
    '/dashboard',
    '/dashboard/my-profile',
    '/dashboard/my-properties',
    '/dashboard/my-inquiries',
    '/dashboard/maintenance-request',
    '/dashboard/my-tenancies',
    
    // Admin Dashboard
    '/dashboard/agency/ads',
    '/dashboard/agency/agents',
    '/dashboard/agency/inquiries',
    '/dashboard/agency/invoices',
    '/dashboard/agency/maintenance-request',
    '/dashboard/agency/profile',
    '/dashboard/agency/properties',
    '/dashboard/agency/reviews',
    '/dashboard/agency/tenants',
    
    // Agent Dashboard
    '/dashboard/agent/inquiries',
    '/dashboard/agent/invoices',
    '/dashboard/agent/maintenance-request',
    '/dashboard/agent/profile',
    '/dashboard/agent/properties',
    '/dashboard/agent/reviews',
    '/dashboard/agent/tenants',
  ];
  
  const results: RouteAnalysis[] = [];
  
  // Analyze each route
  for (const route of routes) {
    const result = analyzeRoute(route);
    if (result) {
      results.push(result);
    }
  }
  
  // Generate report
  let report = '# Component Tree Analysis\n\n';
  let allComponents = new Set<string>();
  
  // Add component trees for each route
  report += '## Route Component Trees\n\n';
  for (const result of results) {
    report += `### ${result.route}\n\n`;
    report += '```\n';
    report += generateTreeVisualization(result.componentTree);
    report += '```\n\n';
    
    // Add component usage stats
    report += `**Total Components:** ${result.allComponents.size}\n\n`;
    
    // Merge all components
    result.allComponents.forEach(c => allComponents.add(c));
  }
  
  // Add component usage statistics
  report += '## Component Usage Statistics\n\n';
  report += `**Total Unique Components:** ${allComponents.size}\n\n`;
  
  // Find potentially unused components
  const allSourceFiles = getSourceFiles(componentsDir);
  const unusedComponents = allSourceFiles.filter(
    file => !allComponents.has(file) && !file.includes('node_modules')
  );
  
  report += `**Potentially Unused Components:** ${unusedComponents.length}\n\n`;
  
  if (unusedComponents.length > 0) {
    report += '### Potentially Unused Components\n\n';
    unusedComponents.slice(0, 50).forEach(comp => {
      const relativePath = path.relative(componentsDir, comp);
      report += `- ${relativePath}\n`;
    });
    
    if (unusedComponents.length > 50) {
      report += `\n...and ${unusedComponents.length - 50} more\n`;
    }
  }
  
  // Write the report to a file
  const reportPath = path.join(projectRoot, 'COMPONENT_TREE_ANALYSIS.md');
  fs.writeFileSync(reportPath, report);
  
  console.log(`\nAnalysis complete! Report saved to: ${reportPath}`);
  console.log(`Analyzed ${results.length} routes and found ${allComponents.size} unique components.`);
  
  return results;
}

// Run the analysis
analyzeAllRoutes().catch(console.error);
