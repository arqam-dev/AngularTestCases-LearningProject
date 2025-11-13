import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { CalculatorComponent } from './calculator/calculator';
import { UserProfileComponent } from './user-profile/user-profile';

/**
 * Critical Test Suite - App Level Tests
 * These tests verify the app builds correctly and components are properly integrated.
 * These are app-dependent tests, not component-specific.
 * Run these separately with: npm run test:critical
 */
describe('App - Critical Tests (App Level)', () => {
  let appComponent: App;
  let appFixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, CalculatorComponent, UserProfileComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    appFixture = TestBed.createComponent(App);
    appComponent = appFixture.componentInstance;
  });

  // ============================================
  // App Build & Creation Tests
  // ============================================
  it('should create the app component', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should have app title defined', () => {
    expect(appComponent.title).toBeDefined();
    expect(appComponent.title).toBe('Angular Test Cases App');
  });

  // ============================================
  // Component Integration Tests
  // ============================================
  it('should render calculator component in app', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement as HTMLElement;
    const calculatorElement = compiled.querySelector('app-calculator');
    expect(calculatorElement).toBeTruthy();
  });

  it('should render user profile component in app', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement as HTMLElement;
    const profileElement = compiled.querySelector('app-user-profile');
    expect(profileElement).toBeTruthy();
  });

  it('should display app title in template', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');
    expect(h1Element?.textContent).toContain('Angular Test Cases App');
  });

  // ============================================
  // Component Creation Tests (Verify Build)
  // ============================================
  it('should create calculator component independently', () => {
    const calculatorFixture = TestBed.createComponent(CalculatorComponent);
    const calculatorComponent = calculatorFixture.componentInstance;
    expect(calculatorComponent).toBeTruthy();
  });

  it('should create user profile component independently', () => {
    const profileFixture = TestBed.createComponent(UserProfileComponent);
    const profileComponent = profileFixture.componentInstance;
    expect(profileComponent).toBeTruthy();
  });

  // ============================================
  // App Structure Tests
  // ============================================
  it('should have both components rendered in app container', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement as HTMLElement;
    const calculator = compiled.querySelector('app-calculator');
    const profile = compiled.querySelector('app-user-profile');
    
    expect(calculator).toBeTruthy();
    expect(profile).toBeTruthy();
  });

  it('should have proper app container structure', () => {
    appFixture.detectChanges();
    const compiled = appFixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.app-container');
    expect(container).toBeTruthy();
  });
});

