# CI/CD Test Setup Guide

## Overview

This project is configured to automatically run tests when you push code to GitHub.

## How It Works

When you push code to `main`, `master`, or `develop` branches, GitHub Actions will:
1. ✅ Run **Critical Tests** first (fast, catches major issues)
2. ✅ Run **All Tests** if critical tests pass (comprehensive)

## Test Suites

### 1. Critical Tests (`app.critical.spec.ts`)
- **Purpose**: Most important tests that must pass
- **Location**: `src/app/app.critical.spec.ts`
- **Run locally**: `npm run test:critical`
- **What it tests**:
  - Component creation
  - Counter increment functionality
  - Reset functionality
  - Message update functionality
  - Basic UI rendering

### 2. All Tests (`app.spec.ts`)
- **Purpose**: Complete test coverage
- **Location**: `src/app/app.spec.ts`
- **Run locally**: `npm test` or `npm run test:ci`
- **What it tests**: Everything including edge cases and UI interactions

## Running Tests Locally

```bash
# Run all tests (watch mode - for development)
npm test

# Run all tests once (CI mode - for checking before push)
npm run test:ci

# Run only critical tests
npm run test:critical
```

## GitHub Actions Workflow

The workflow file is located at: `.github/workflows/tests.yml`

**What happens on push:**
1. Code is checked out
2. Node.js and dependencies are installed
3. Critical tests run first
4. If critical tests pass, all tests run
5. If any test fails, the workflow fails

## Viewing Test Results

After pushing code:
1. Go to your GitHub repository
2. Click on the "Actions" tab
3. You'll see the test run status:
   - ✅ Green checkmark = All tests passed
   - ❌ Red X = Tests failed (check the logs)

## Test Failure

If tests fail in CI:
1. Check the error message in GitHub Actions
2. Run tests locally: `npm run test:ci`
3. Fix the failing tests
4. Push again

## Customization

### To change which branches trigger tests:
Edit `.github/workflows/tests.yml`:
```yaml
on:
  push:
    branches: [ main, your-branch-name ]
```

### To add more critical tests:
Edit `src/app/app.critical.spec.ts` and add more test cases.

### To run only critical tests in CI:
Edit `.github/workflows/tests.yml` and remove the `all-tests` job.

## Notes

- Tests run in headless Chrome (no browser window)
- Tests run automatically - you don't need to do anything
- If tests fail, the push still goes through, but you'll see a failure status
- You can configure branch protection rules to require tests to pass before merging

