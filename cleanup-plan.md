# Codebase Cleanup Plan

This document outlines the step-by-step plan for eliminating unused code and components from the codebase. Use this as a reference and checklist throughout the cleanup process.

---

## Step 1: Preparation & Tooling

1. **Version Control**
   - Ensure the project is under version control (Git).
   - Create a new branch for the cleanup effort.

2. **Automated Tools**
   - Install and configure tools to detect unused code and dependencies:
     - JavaScript/TypeScript: `ts-prune`, `eslint-plugin-unused-imports`, `depcheck`, `next-unused`.
     - CSS/SASS: `purgecss` or Next.js built-in CSS optimization.
   - Update linter and formatter configurations as needed.

---

## Step 2: Detecting Unused Code

1. **Unused Files and Components**
   - Run tools like `ts-prune` and `depcheck` to identify:
     - Unused files
     - Unused exports (functions, components)
     - Unused dependencies

2. **Manual Review**
   - For flagged files, manually verify they are not dynamically imported or referenced in non-standard ways.
   - Check for files used in tests, scripts, or by frameworks (e.g., dynamic Next.js routes).

3. **Unused CSS/Assets**
   - Use PurgeCSS or Next.js CSS optimization to find and remove unused styles.
   - Manually review the `public` folder for unused images/assets.

---

## Step 3: Safe Removal

1. **Incremental Deletion**
   - Remove unused code in small, logical batches (by feature, component type, etc).
   - After each batch, run the app and its test suite.

2. **Testing**
   - Run all automated tests (unit, integration, E2E).
   - Manually verify critical flows.
   - Use visual regression testing if possible.

3. **Code Review**
   - Have another developer review changes, especially for files hard to analyze statically.

---

## Step 4: Finalization

1. **Dependency Cleanup**
   - Remove unused dependencies from `package.json` using `depcheck` and manual review.
   - Run `pnpm install` (or npm/yarn) to prune `node_modules`.

2. **Documentation**
   - Update README/internal docs for any structural or architectural changes.
   - Note removed features or deprecated modules.

3. **Merge and Monitor**
   - Merge the cleanup branch after QA.
   - Monitor error tracking/logging for missed edge cases in production.

---

## Step 5: Ongoing Prevention

1. **CI Integration**
   - Integrate unused code checks into your CI pipeline.
   - Encourage small, modular PRs for easier future cleanups.

2. **Developer Training**
   - Share best practices for modular, maintainable code to prevent future bloat.

---

## Summary Table

| Step            | Tool/Action                       | Output/Goal                 |
|-----------------|-----------------------------------|-----------------------------|
| Preparation     | Branch, install tools             | Safe environment            |
| Detection       | ts-prune, depcheck, PurgeCSS      | List of unused code/assets  |
| Manual Review   | Code search, dynamic import check | Confirm unused status       |
| Safe Removal    | Delete, test, review              | Remove with confidence      |
| Finalization    | Prune deps, update docs           | Clean, documented codebase  |
| Prevention      | CI, training                      | Ongoing code health         |

---

> Use this checklist as you progress. Check off each section as you complete it to ensure a thorough and safe cleanup process.
