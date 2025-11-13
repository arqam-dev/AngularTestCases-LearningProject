# Angular Testing Guide..

## Testing Library Used

**This project uses ONE main testing library:**

### **Jasmine** (v5.9.0)
- This is the **only library** you need to learn for writing tests
- Provides all the syntax: `describe()`, `it()`, `expect()`, `toBe()`, etc.
- You write all your test code using Jasmine

**Note:** 
- **Karma** is just a tool that runs the tests (like how `npm` runs scripts - you don't write code for it)
- **TestBed** is just Angular's built-in helper (comes with Angular, not a separate library)

**Bottom line: You only need to learn Jasmine syntax to write tests.**

---

## Running Tests

```bash
npm test
```

### Important: Tests Run Independently

**You do NOT need to keep the development server running to run tests.**

- **Running the app**: `npm start` or `ng serve` (only needed to view app in browser)
- **Running tests**: `npm test` or `ng test` (runs independently, no server needed)

Tests run in their own isolated environment. You can:
- Run tests while the dev server is running ✅
- Run tests without the dev server running ✅
- Run tests in a completely separate terminal ✅

**Tests are completely independent from the development server.**

---

## Basic Test Structure

All test files end with `.spec.ts` (e.g., `app.spec.ts`)

```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App Component', () => {
  let component: App;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## Common Test Examples (Using Jasmine)

### 1. Test Component Property

```typescript
it('should have initial count of 0', () => {
  expect(component.count).toBe(0);
});
```

### 2. Test Component Method

```typescript
it('should increment count', () => {
  component.increment();
  expect(component.count).toBe(1);
});
```

### 3. Test Template Display

```typescript
it('should display count in template', () => {
  component.count = 5;
  fixture.detectChanges(); // Always call this after changing component state
  
  const element = fixture.nativeElement.querySelector('h2');
  expect(element.textContent).toContain('Counter: 5');
});
```

### 4. Test Button Click

```typescript
it('should handle button click', () => {
  fixture.detectChanges();
  const button = fixture.nativeElement.querySelector('button');
  button.click();
  fixture.detectChanges();
  
  expect(component.count).toBe(1);
});
```

### 5. Test Input Change

```typescript
it('should update message on input', () => {
  fixture.detectChanges();
  const input = fixture.nativeElement.querySelector('input');
  
  input.value = 'New Message';
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  
  expect(component.message).toBe('New Message');
});
```

---

## Important: Always Call `fixture.detectChanges()`

After modifying component properties or interacting with the UI, always call `fixture.detectChanges()` to update the template.

```typescript
// ✅ Correct
component.count = 5;
fixture.detectChanges(); // Required!

// ❌ Wrong
component.count = 5;
// Missing detectChanges() - template won't update
```

---

## Jasmine Matchers (The Main Ones You'll Use)

- `toBe(value)` - Exact equality
- `toEqual(value)` - Deep equality for objects/arrays
- `toContain(value)` - Check if contains value
- `toBeTruthy()` - Check if truthy
- `toBeFalsy()` - Check if falsy

---

## Understanding Test Results

### How to Identify Test Failures vs Code Errors

#### ✅ **Test Failure** (Test found a bug in your code)

**What it looks like:**
```
Chrome: App Component should increment count FAILED
        Expected 1 to be 2.
        at Object.<anonymous> (app.spec.ts:35:5)
Chrome: Executed 18 of 18 (1 FAILED, 17 SUCCESS)
TOTAL: 1 FAILED, 17 SUCCESS
```

**Key indicators:**
- Shows test name that failed: `"should increment count FAILED"`
- Shows expected vs actual: `Expected 1 to be 2`
- Shows which test file: `app.spec.ts:35:5`
- Other tests may still pass
- Tests can run (code compiles)

**What it means:** Your code doesn't work as expected. The test is correct, but your component has a bug.

**Example:**
```typescript
// Test expects count to be 2 after two increments
it('should increment count', () => {
  component.increment();
  component.increment();
  expect(component.count).toBe(2); // ❌ FAILS if count is only 1
});
```

---

#### ❌ **Code Error** (Syntax/Compilation error)

**What it looks like:**
```
ERROR in src/app/app.ts:12:5
TS2322: Type 'string' is not assignable to type 'number'.
    12   count = "hello";
         ~~~~~
```

**OR:**

```
Error: Cannot find module './app'
    at Object.<anonymous> (app.spec.ts:3:1)
```

**Key indicators:**
- Shows `ERROR` or `Cannot find module`
- Shows file and line number with code issue
- Tests **cannot run** (code won't compile)
- Usually TypeScript compilation errors
- Syntax errors, missing imports, type mismatches

**What it means:** Your code has a syntax or compilation error. Fix the code first, then tests can run.

**Example:**
```typescript
// Code error - wrong type
count = "hello"; // ❌ Should be number, not string
```

---

### Quick Comparison

| Test Failure | Code Error |
|-------------|------------|
| ✅ Tests can run | ❌ Tests cannot run |
| Shows test name | Shows file/line with error |
| "Expected X to be Y" | "Cannot find", "Type error" |
| Code compiles | Code won't compile |
| Fix your component code | Fix syntax/imports/types |

---

### Example Outputs

**Test Failure Output:**
```
Chrome: App Component should increment count FAILED
        Expected 1 to be 2.
Chrome: Executed 18 of 18 (1 FAILED, 17 SUCCESS)
```
→ **Action:** Fix your component code (the `increment()` method)

**Code Error Output:**
```
ERROR in src/app/app.ts:10:5
TS1005: ';' expected.
```
→ **Action:** Fix the syntax error in your code first

---

## Best Practices

1. Use descriptive test names: `it('should increment count when button is clicked')`
2. One test = one behavior
3. Always call `fixture.detectChanges()` after changing component state
4. Group related tests with `describe()` blocks

---

## Alternative Libraries (Not Used Here)

- **Jest** - Alternative to Jasmine (some projects use this instead)
- **Cypress/Playwright** - For end-to-end testing (different purpose, not unit tests)

**This project uses Jasmine only.**

---

## Quick Reference

```typescript
// Setup (in beforeEach)
fixture = TestBed.createComponent(Component);
component = fixture.componentInstance;

// Test property (Jasmine syntax)
expect(component.property).toBe(value);

// Test template
fixture.detectChanges();
const element = fixture.nativeElement.querySelector('selector');

// Test interaction
button.click();
fixture.detectChanges();
```

---

## Resources

- [Jasmine Documentation](https://jasmine.github.io/) - Learn Jasmine syntax
- [Angular Testing Docs](https://angular.dev/guide/testing) - Angular-specific testing
