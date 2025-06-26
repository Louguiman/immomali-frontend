/* -------------------------------------------------------------------------- */
/*                      is children page active checking                      */
/* -------------------------------------------------------------------------- */

export function isSinglePageActive(path: string | undefined, match: string | undefined): boolean {
  if (path && match) {
    if (path.includes(match)) {
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
  pages: Array<{ route: string }> | undefined,
  path: string
): boolean {
  if (pages) {
    return pages.some((page) => path.includes(page.route));
  }
  return false;
}
