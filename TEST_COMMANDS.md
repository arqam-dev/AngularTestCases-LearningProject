# Test Commands Guide

## Available Test Commands

### Run All Tests
```bash
npm test
# or
npm run test:all
```
Runs all test cases in the application (calculator, user-profile, and critical tests).

---

### Run Critical Tests Only
```bash
npm run test:critical
```
Runs only the app-level critical tests (`app.critical.spec.ts`).
These tests verify:
- App component creation
- App builds correctly
- Components are integrated
- Components render properly

---

### Run Calculator Component Tests
```bash
# Run once (CI mode)
npm run test:calculator

# Run in watch mode (auto-reruns on changes)
npm run test:calculator:watch
```
Runs only the calculator component tests (`calculator.spec.ts`).
Tests calculator functionality:
- Number input
- Mathematical operations
- Clear function
- UI interactions

---

### Run User Profile Component Tests
```bash
# Run once (CI mode)
npm run test:user-profile

# Run in watch mode (auto-reruns on changes)
npm run test:user-profile:watch
```
Runs only the user profile component tests (`user-profile.spec.ts`).
Tests user profile functionality:
- Profile display
- Edit mode
- Profile updates
- Age controls

---

### CI Mode (All Tests)
```bash
npm run test:ci
```
Runs all tests once in headless mode (for CI/CD).
- No watch mode
- Headless Chrome
- Exits after completion

---

## Command Summary

| Command | What It Runs | Use Case |
|---------|-------------|----------|
| `npm test` | All tests (watch mode) | Development - auto-reruns on changes |
| `npm run test:all` | All tests (watch mode) | Same as `npm test` |
| `npm run test:critical` | Critical tests only | Quick app-level checks |
| `npm run test:calculator` | Calculator tests (once) | Quick calculator test |
| `npm run test:calculator:watch` | Calculator tests (watch) | Develop calculator component |
| `npm run test:user-profile` | User Profile tests (once) | Quick user profile test |
| `npm run test:user-profile:watch` | User Profile tests (watch) | Develop user profile component |
| `npm run test:ci` | All tests (CI mode) | Before pushing code |

---

## Examples

### Development Workflow

```bash
# Start developing calculator component
npm run test:calculator
# Tests run in watch mode, auto-rerun on file changes

# Switch to user profile component
npm run test:user-profile

# Check if app still builds correctly
npm run test:critical

# Run all tests before committing
npm run test:ci
```

### Quick Testing

```bash
# Test only what you're working on
npm run test:calculator

# Verify app integration
npm run test:critical

# Full test suite
npm test
```

---

## Notes

- Commands with `--watch=false` run once and exit
- Commands without `--watch=false` run in watch mode (auto-rerun on changes)
- All component-specific commands use headless Chrome
- Use `npm test` for interactive development
- Use `npm run test:ci` before pushing code

