# Sitemap and Link Analysis Report

## Overview
This report analyzes the internal linking structure of the Immo-Mali frontend application to identify:
1. Main navigation routes
2. Orphaned pages (pages with no incoming links)
3. Most linked-to pages
4. Potentially unused pages

## Data Collection Methodology
- Analyzed all `.tsx` and `.jsx` files in the `components` directory
- Searched for `Link` components and `router.push` calls
- Mapped out all internal links and their sources

## Main Navigation Structure

### Public Routes
| Path | Description |
|------|-------------|
| `/` | Homepage |
| `/login` | User login |
| `/register` | User registration |
| `/properties` | Property listings |
| `/listing-details-v{1-3}/:id` | Property detail pages (multiple versions) |
| `/agent-details/:id` | Agent profile page |
| `/agency-details/:id` | Agency profile page |
| `/blog-list-1` | Blog listing |
| `/contact` | Contact page |

### Dashboard Routes (Authenticated)
| Path | Description |
|------|-------------|
| `/dashboard` | User dashboard |
| `/dashboard/my-profile` | User profile |
| `/dashboard/my-properties` | User's properties |
| `/dashboard/my-inquiries` | User's inquiries |
| `/dashboard/maintenance-request` | Maintenance requests |
| `/dashboard/my-tenancies` | User's tenancies |

## Orphaned Pages (Potentially Unused)

These pages exist in the codebase but have no internal links pointing to them:

### Admin Dashboard Pages
- `/dashboard/agency/*`
  - `/ads` (v2 TODO: Review and implement or remove)
  - ~~`/favourites`~~ REMOVED

### Agent Dashboard Pages
- `/dashboard/agent/*`
  - No truly orphaned pages found (all are linked in the sidebar)

### Other Dashboard Pages
- `/dashboard/notifications` (v2 TODO: Implement notification system)
- `/dashboard/settings` (v2 TODO: Implement settings page)

### Removed Pages
- ~~`/my-dashboard`~~ REMOVED (duplicate of `/dashboard`)
- ~~`/dashboard/agency/favourites`~~ REMOVED
- ~~`/dashboard/my-favourites`~~ REMOVED
- Various versioned listing detail pages (v1, v2, v3)

## Most Linked-To Pages

1. **Property Detail Pages**
   - `/listing-details-v1/:id`
   - `/listing-details-v2/:id`
   - `/listing-details-v3/:id`

2. **Agent/Agency Pages**
   - `/agent-details/:id`
   - `/agency-details/:id`
   - `/agent-v1`
   - `/agent-v2`

3. **Authentication**
   - `/login`
   - `/register`
   - `/dashboard` (after login)

## Recommendations

1. **Consolidate Duplicate Routes**
   - Multiple versions of similar pages exist (e.g., listing-details-v1, v2, v3)
   - Consider standardizing on a single version and redirecting old routes

2. **Review and Implement v2 Features**
   - Marked several pages as v2 TODO items that need review and implementation
   - Focus on completing the ads system and user settings
   
3. **Removed Unused Pages**
   - Removed `/my-dashboard` as it was a duplicate of `/dashboard`
   - Removed favorites functionality (`/dashboard/agency/favourites` and `/dashboard/my-favourites`) as it's no longer needed

3. **Implement Proper 404 Handling**
   - Some routes might be accessible via direct URL but not linked in the UI
   - Ensure proper 404 handling for non-existent routes

4. **Audit Authentication Flow**
   - Multiple dashboard paths exist (`/dashboard`, `/my-dashboard`)
   - Standardize on a single dashboard structure

5. **Consider Route Groups**
   - Use Next.js route groups to better organize related routes
   - Example: `/(auth)/login`, `/(dashboard)/profile`

## Next Steps

1. **User Testing**
   - Verify if the orphaned pages are actually used by specific user roles
   - Check analytics to see if these pages receive any traffic

2. **Code Cleanup**
   - Remove or properly link to all orphaned pages
   - Consolidate duplicate functionality

3. **Documentation**
   - Document the routing structure for future development
   - Add JSDoc comments to route handlers and components

## Generated On
2025-07-02T10:28:27Z
