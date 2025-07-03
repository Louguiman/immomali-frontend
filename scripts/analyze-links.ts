import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Configuration
const ROOT_DIR = path.join(__dirname, '..');
const PAGES_DIR = path.join(ROOT_DIR, 'app/[locale]');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'components');
const IGNORE_PATTERNS = ['**/node_modules/**', '**/.next/**', '**/out/**'];

// Track all pages and their links
const pages = new Map<string, Set<string>>();
const allLinks = new Set<string>();

// Get all page files
async function findPages() {
  const pageFiles = await glob('**/page.tsx', { 
    cwd: PAGES_DIR,
    ignore: IGNORE_PATTERNS
  });

  // Add all pages to our map
  pageFiles.forEach(file => {
    const route = file
      .replace(/\/page\.tsx$/, '') // Remove /page.tsx
      .replace(/\[([^\]]+)\]/g, ':$1'); // Convert [param] to :param
    
    pages.set(route, new Set());
  });

  return pageFiles;
}

// Find all links in a file
function findLinksInFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const linkRegex = /<Link[^>]*href=["']([^"']+)["'][^>]*>/g;
    const matches = [...content.matchAll(linkRegex)];
    
    return matches.map(match => {
      // Remove query params and hashes for now
      return match[1].split('?')[0].split('#')[0];
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Analyze all files for links
async function analyzeLinks() {
  const pageFiles = await findPages();
  
  // Get all component files
  const componentFiles = await glob('**/*.{tsx,jsx,ts,js}', {
    cwd: ROOT_DIR,
    ignore: [
      ...IGNORE_PATTERNS,
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/scripts/**'
    ]
  });

  // Process all files
  const allFiles = [...pageFiles, ...componentFiles];
  
  allFiles.forEach(relativePath => {
    const fullPath = path.join(ROOT_DIR, relativePath);
    const links = findLinksInFile(fullPath);
    
    links.forEach(link => {
      allLinks.add(link);
      
      // Find which page this link is on
      const sourcePage = pageFiles.find(page => 
        fullPath.includes(page.replace('/page.tsx', ''))
      );
      
      if (sourcePage) {
        const sourceRoute = sourcePage
          .replace(/\/page\.tsx$/, '')
          .replace(/\[([^\]]+)\]/g, ':$1');
          
        if (pages.has(sourceRoute)) {
          pages.get(sourceRoute)?.add(link);
        }
      }
    });
  });

  // Generate report
  const report: string[] = [];
  
  // Add header
  report.push('# Internal Link Analysis Report\n');
  report.push(`Generated on: ${new Date().toISOString()}\n`);
  
  // Summary
  report.push('## Summary\n');
  report.push(`- Total Pages: ${pages.size}`);
  report.push(`- Total Unique Links: ${allLinks.size}\n`);
  
  // Orphaned pages (pages with no incoming links)
  const orphanedPages = Array.from(pages.entries())
    .filter(([_, links]) => links.size === 0)
    .map(([page]) => page);
    
  report.push('## Orphaned Pages\n');
  report.push('These pages exist but have no internal links pointing to them:\n');
  
  if (orphanedPages.length > 0) {
    orphanedPages.forEach(page => {
      report.push(`- \`${page}\``);
    });
  } else {
    report.push('No orphaned pages found!');
  }
  
  // Pages with most links
  report.push('\n## Pages with Most Outbound Links\n');
  const sortedPages = Array.from(pages.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 10);
    
  sortedPages.forEach(([page, links]) => {
    report.push(`- \`${page}\`: ${links.size} outbound links`);
  });
  
  // Write report
  const reportPath = path.join(ROOT_DIR, 'LINK_ANALYSIS_REPORT.md');
  fs.writeFileSync(reportPath, report.join('\n'));
  console.log(`Report generated at: ${reportPath}`);
}

// Run the analysis
analyzeLinks().catch(console.error);
