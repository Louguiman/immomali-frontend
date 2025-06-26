/* -------------------------------------------------------------------------- */
/*                      is children page active checking                      */
/* -------------------------------------------------------------------------- */

export function isChildrenPageActive(
  path: string | undefined,
  match: string | undefined
): boolean {
  if (path && match) {
    if (path === match) {
      return true;
    }
    return false;
  }
  return false;
}

/* -------------------------------------------------------------------------- */
/*                       is parent page active checking                       */
/* -------------------------------------------------------------------------- */
export function isParentPageActive(
  pages: { path: string }[] | undefined,
  path: string | undefined
): boolean {
  if (pages) {
    return pages.some((page) => page.path === path);
  }
  return false;
}
