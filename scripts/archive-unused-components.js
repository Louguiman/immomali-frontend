const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECT_ROOT = path.join(__dirname, '..');
const ARCHIVE_DIR = path.join(PROJECT_ROOT, 'archive');

// List of unused components from Knip output
const UNUSED_COMPONENTS = [
  // Components from .trash directory
  '.trash/About-us-Team.tsx',
  '.trash/Blog-list-1-Blog.tsx',
  '.trash/Blog-list-2-Blog.tsx',
  '.trash/Blog-list-3-Blog.tsx',
  '.trash/Blogs.tsx',
  '.trash/GalleryBox.tsx',
  '.trash/RelatedPost.tsx',
  '.trash/SingleService.tsx',
  '.trash/Testimonial.tsx',
  
  // Individual components
  'components/LazyIcon.tsx',
  'components/agent-details/index.tsx',
  'components/blog-details/ReviewForm.tsx',
  'components/blog-details/ReviewList.tsx',
  'components/common/DynamicMenu.tsx',
  'components/common/GlobalSelectBox.tsx',
  'components/common/SaveSearchBtn.tsx',
  'components/common/seo.tsx',
  'components/common/SimpleFilter.tsx',
  
  // Listing details versions (keeping only one version?)
  'components/listing-details-v1/index.tsx',
  'components/listing-details-v2/index.tsx',
  'components/listing-details-v2/DetailsContent.tsx',
  'components/listing-details-v2/Sidebar.tsx',
  'components/listing-details-v3/index.tsx',
  'components/listing-details-v3/DetailsContent.tsx',
  'components/listing-details-v3/Sidebar.tsx',
  'components/listing-details-v3/SliderGallery.tsx',
  'components/listing-details-v4/index.tsx',
  'components/listing-details-v4/DetailsContent.tsx',
  'components/listing-details-v4/Sidebar.tsx',
  'components/listing-details-v4/SliderGalleryContent.tsx',
  'components/listing-details-v4/StickyHeading.tsx',
  
  // Dashboard components
  'components/dashboard/ads/AdCard.tsx',
  'components/dashboard/ads/AdminFilters.tsx',
  'components/dashboard/ads/AdsPage.tsx',
  'components/dashboard/ads/ManageAdModal.tsx',
  'components/dashboard/create-listing/InputField.tsx',
  'components/dashboard/create-tenant/FloorPlans.tsx',
  'components/dashboard/create-tenant/InputField.tsx',
  'components/dashboard/my-message/CurrentChatboxUser.tsx',
  'components/dashboard/my-review/Pagination.tsx',
  'components/dashboard/my-review/SearchBox.tsx',
  'components/dashboard/my-tenancies/ManageLease.tsx',
  'components/dashboard/tenants-management/PaymentForm.tsx',
  'components/dashboard/tenants-management/PaymentHistory.tsx',
  'components/dashboard/tenants-management/TenantModal.tsx',
  'components/dashboard/users-management/index.tsx',
  
  // Listing grid versions
  'components/listing-grid/grid-v1/index.tsx',
  'components/listing-grid/grid-v2/index.tsx',
  'components/listing-grid/grid-v2/BreadCrumb2.tsx',
  'components/listing-grid/grid-v2/FeaturedItem.tsx',
  'components/listing-grid/grid-v3/index.tsx',
  'components/listing-grid/grid-v3/BreadCrumb2.tsx',
  'components/listing-grid/grid-v3/FeaturedItem.tsx',
  'components/listing-grid/grid-v4/index.tsx',
  'components/listing-grid/grid-v4/BreadCrumb2.tsx',
  'components/listing-grid/grid-v4/FeaturedItem.tsx',
  'components/listing-grid/grid-v5/index.tsx',
  'components/listing-grid/grid-v5/BreadCrumb2.tsx',
  'components/listing-grid/grid-v5/FeaturedItem.tsx',
  'components/listing-grid/grid-v6/index.tsx',
  'components/listing-grid/grid-v6/BreadCrumb2.tsx',
  'components/listing-grid/grid-v6/FeaturedItem.tsx',
  
  // Other components
  'components/logout/Form.tsx',
  'components/logout/index.tsx',
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
    // Use git mv to track the move in version control
    execSync(`git mv "${sourcePath}" "${targetPath}"`, { stdio: 'inherit' });
    console.log(`Moved ${relativePath} to archive`);
  } catch (error) {
    console.error(`Error moving ${relativePath}:`, error);
  }
}

// Process all unused components
console.log('Starting to archive unused components...');
UNUSED_COMPONENTS.forEach(component => {
  // Skip if the file doesn't exist
  if (!fs.existsSync(path.join(PROJECT_ROOT, component))) {
    console.log(`Skipping non-existent file: ${component}`);
    return;
  }
  
  archiveFile(component);
  
  // Also look for related files (like CSS modules, test files, etc.)
  const dir = path.dirname(component);
  const baseName = path.basename(component, path.extname(component));
  
  const possibleRelatedFiles = [
    path.join(dir, `${baseName}.module.css`),
    path.join(dir, `${baseName}.test.tsx`),
    path.join(dir, `${baseName}.stories.tsx`),
    path.join(dir, `${baseName}.types.ts`),
  ];
  
  possibleRelatedFiles.forEach(relatedFile => {
    if (fs.existsSync(path.join(PROJECT_ROOT, relatedFile))) {
      archiveFile(relatedFile);
    }
  });
});

console.log('\nArchiving complete!');
console.log(`Check ${ARCHIVE_DIR} for archived components.`);
console.log('\nNext steps:');
console.log('1. Review the changes with: git status');
console.log('2. Test your application to ensure everything still works');
console.log('3. Commit the changes: git commit -m "chore: archive unused components"');
