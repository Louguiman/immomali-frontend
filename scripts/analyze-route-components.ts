import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const appDir = path.join(projectRoot, 'app');

// Define the active routes from the sitemap
const activeRoutes = [
  // Public Routes
  '/',
  '/login',
  '/register',
  '/properties',
  '/listing-details-v1/[id]',
  '/listing-details-v2/[id]',
  '/listing-details-v3/[id]',
  '/agent-details/[id]',
  '/agency-details/[id]',
  '/blog-list-1',
  '/contact',
  
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
  
  // Other Dashboard Pages
  '/dashboard/notifications',
  '/dashboard/settings'
];

// Function to find component files for a route
function findComponentsForRoute(route: string) {
  // Convert route to file path
  let filePath = route;
  
  // Handle dynamic segments
  filePath = filePath.replace(/\[([^\]]+)\]/g, '[$1]');
  
  // Check for page.tsx file
  const pagePath = path.join(appDir, '[locale]', '(admin)', filePath, 'page.tsx');
  const components = [];
  
  if (fs.existsSync(pagePath)) {
    components.push(pagePath);
    
    // Read the file to find imported components
    const content = fs.readFileSync(pagePath, 'utf-8');
    const importMatches = content.matchAll(/from ['"](@\/components\/[^'"]+)['"]/g);
    
    for (const match of importMatches) {
      components.push(match[1]);
    }
  }
  
  return components.filter((x): x is string => x !== undefined);
}

// Analyze all active routes
const routeComponents: Record<string, string[]> = {};

for (const route of activeRoutes) {
  const components = findComponentsForRoute(route);
  if (components.length > 0) {
    routeComponents[route] = components;
  }
}

// Generate a report
const report = `# Active Routes and Their Components

This report maps active routes to their corresponding components.

## Route to Components Mapping

${Object.entries(routeComponents)
  .map(([route, components]) => `### ${route}
${components.map(c => `- ${c}`).join('\n')}`)
  .join('\n\n')}

## Components Usage Count

${Object.entries(
  Object.values(routeComponents)
    .flat()
    .reduce((acc, component) => {
      acc[component] = (acc[component] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
)
  .sort(([,a], [,b]) => b - a)
  .map(([component, count]) => `- ${component} (used ${count} ${count === 1 ? 'time' : 'times'})`)
  .join('\n')}
`;

// Write the report to a file
fs.writeFileSync(path.join(projectRoot, 'COMPONENT_ANALYSIS.md'), report);

console.log('Component analysis complete. Report saved to COMPONENT_ANALYSIS.md');
