# Component Structure

## Overview

This project has been restructured with a simple app component and two feature components, each with their own test cases.

## Structure

```
src/app/
├── app.ts                    # Simple app component (just displays other components)
├── app.html                  # App template
├── app.scss                  # App styles
├── app.critical.spec.ts      # App-level critical tests (build, integration)
│
├── calculator/
│   ├── calculator.ts         # Calculator component
│   ├── calculator.html       # Calculator template
│   ├── calculator.scss       # Calculator styles
│   └── calculator.spec.ts    # Calculator test cases
│
└── user-profile/
    ├── user-profile.ts       # User Profile component
    ├── user-profile.html     # User Profile template
    ├── user-profile.scss     # User Profile styles
    └── user-profile.spec.ts  # User Profile test cases
```

## Components

### 1. App Component (`app.ts`)
- **Purpose**: Simple container component
- **Functionality**: Just displays the title and renders Calculator and User Profile components
- **Tests**: `app.critical.spec.ts` - Tests app-level things (build, integration, component rendering)

### 2. Calculator Component (`calculator/calculator.ts`)
- **Purpose**: Calculator functionality
- **Functionality**: 
  - Number input
  - Basic operations (+, -, *, /)
  - Clear function
  - Equals function
- **Tests**: `calculator.spec.ts` - All calculator-specific tests

### 3. User Profile Component (`user-profile/user-profile.ts`)
- **Purpose**: User profile management
- **Functionality**:
  - Display user info (name, email, age)
  - Edit mode
  - Update profile
  - Age increment/decrement
- **Tests**: `user-profile.spec.ts` - All user profile-specific tests

## Test Files

### `app.critical.spec.ts`
**App-level critical tests** that verify:
- ✅ App component creation
- ✅ App builds correctly
- ✅ Components are properly integrated
- ✅ Components render in app
- ✅ App structure is correct

**These are NOT component-specific tests** - they test the app as a whole.

### `calculator.spec.ts`
**Calculator component tests** that verify:
- ✅ Component creation
- ✅ Number input functionality
- ✅ Mathematical operations (+, -, *, /)
- ✅ Clear functionality
- ✅ UI interactions
- ✅ Edge cases

### `user-profile.spec.ts`
**User Profile component tests** that verify:
- ✅ Component creation
- ✅ Profile display
- ✅ Edit mode functionality
- ✅ Profile updates
- ✅ Age controls
- ✅ UI interactions
- ✅ Edge cases

## Running Tests

```bash
# Run all tests
npm test

# Run all tests once (CI mode)
npm run test:ci

# Run only critical app-level tests
npm run test:critical
```

## Test Organization

- **Component tests** (`*.spec.ts`) - Test individual component functionality
- **Critical tests** (`app.critical.spec.ts`) - Test app-level integration and build

## CI/CD

When you push code:
1. Critical tests run first (app-level checks)
2. All tests run (including component tests)

This ensures the app builds correctly and all components work together.

