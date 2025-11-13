import { provideZonelessChangeDetection } from '@angular/core';
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

  // ============================================
  // Component Creation Tests
  // ============================================
  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  // ============================================
  // Initial State Tests
  // ============================================
  it('should initialize with count of 0', () => {
    expect(component.count).toBe(0);
  });

  it('should initialize with default message', () => {
    expect(component.message).toBe('Welcome to Angular Test Cases');
  });

  // ============================================
  // Counter Functionality Tests
  // ============================================
  it('should increment count when increment() is called', () => {
    component.increment();
    expect(component.count).toBe(1);
    
    component.increment();
    expect(component.count).toBe(2);
  });

  it('should decrement count when decrement() is called', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
    
    component.decrement();
    expect(component.count).toBe(3);
  });

  it('should reset count to 0 when reset() is called', () => {
    component.count = 10;
    component.reset();
    expect(component.count).toBe(0);
  });

  it('should handle multiple increment and decrement operations', () => {
    component.increment();
    component.increment();
    component.increment();
    expect(component.count).toBe(3);
    
    component.decrement();
    expect(component.count).toBe(2);
    
    component.reset();
    expect(component.count).toBe(0);
  });

  // ============================================
  // Message Functionality Tests
  // ============================================
  it('should update message when updateMessage() is called', () => {
    const newMessage = 'New Test Message';
    component.updateMessage(newMessage);
    expect(component.message).toBe(newMessage);
  });

  it('should handle empty message update', () => {
    component.updateMessage('');
    expect(component.message).toBe('');
  });

  // ============================================
  // UI Rendering Tests
  // ============================================
  it('should display the initial message in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');
    expect(h1Element?.textContent).toContain('Welcome to Angular Test Cases');
  });

  it('should display the current count in the template', () => {
    component.count = 5;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h2Element = compiled.querySelector('h2');
    expect(h2Element?.textContent).toContain('Counter: 5');
  });

  it('should update displayed message when message changes', () => {
    component.updateMessage('Updated Message');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');
    expect(h1Element?.textContent).toContain('Updated Message');
  });

  // ============================================
  // UI Interaction Tests
  // ============================================
  it('should increment count when Increment button is clicked', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const incrementButton = compiled.querySelector('button') as HTMLButtonElement;
    
    incrementButton.click();
    fixture.detectChanges();
    
    expect(component.count).toBe(1);
    const h2Element = compiled.querySelector('h2');
    expect(h2Element?.textContent).toContain('Counter: 1');
  });

  it('should decrement count when Decrement button is clicked', () => {
    component.count = 5;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const decrementButton = buttons[1] as HTMLButtonElement;
    
    decrementButton.click();
    fixture.detectChanges();
    
    expect(component.count).toBe(4);
  });

  it('should reset count when Reset button is clicked', () => {
    component.count = 10;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const resetButton = buttons[2] as HTMLButtonElement;
    
    resetButton.click();
    fixture.detectChanges();
    
    expect(component.count).toBe(0);
  });

  it('should update message when input value changes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputElement = compiled.querySelector('input') as HTMLInputElement;
    
    inputElement.value = 'New Input Message';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.message).toBe('New Input Message');
  });

  // ============================================
  // Edge Cases Tests
  // ============================================
  it('should handle negative count values', () => {
    component.count = -1;
    component.decrement();
    expect(component.count).toBe(-2);
  });

  it('should handle very large count values', () => {
    component.count = 1000;
    component.increment();
    expect(component.count).toBe(1001);
  });
});
