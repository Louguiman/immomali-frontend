/* -------------------------------------------------------------------------- */
/*                      is children page active checking                      */
/* -------------------------------------------------------------------------- */

export function isSinglePageActive(path, match) {
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
export function isParentPageActive(pages, path) {
  if (pages) {
    return pages.some((page) => path.includes(page.route));
  }
  return false;
}
