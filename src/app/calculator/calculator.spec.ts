import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
  });

  // ============================================
  // Component Creation Tests
  // ============================================
  it('should create the calculator component', () => {
    expect(component).toBeTruthy();
  });

  // ============================================
  // Initial State Tests
  // ============================================
  it('should initialize with display of 0', () => {
    expect(component.display).toBe('0');
  });

  it('should initialize with null previousValue', () => {
    expect(component.previousValue).toBeNull();
  });

  it('should initialize with null operation', () => {
    expect(component.operation).toBeNull();
  });

  // ============================================
  // Number Input Tests
  // ============================================
  it('should update display when number is input', () => {
    component.inputNumber('5');
    expect(component.display).toBe('5');
  });

  it('should append numbers to display', () => {
    component.inputNumber('1');
    component.inputNumber('2');
    component.inputNumber('3');
    expect(component.display).toBe('123');
  });

  it('should replace 0 with first number', () => {
    component.inputNumber('7');
    expect(component.display).toBe('7');
    expect(component.display).not.toBe('07');
  });

  // ============================================
  // Operation Tests
  // ============================================
  it('should set operation when operator is input', () => {
    component.inputNumber('5');
    component.inputOperator('+');
    expect(component.operation).toBe('+');
    expect(component.previousValue).toBe(5);
  });

  it('should handle addition', () => {
    component.inputNumber('5');
    component.inputOperator('+');
    component.inputNumber('3');
    component.equals();
    expect(component.display).toBe('8');
  });

  it('should handle subtraction', () => {
    component.inputNumber('10');
    component.inputOperator('-');
    component.inputNumber('3');
    component.equals();
    expect(component.display).toBe('7');
  });

  it('should handle multiplication', () => {
    component.inputNumber('4');
    component.inputOperator('*');
    component.inputNumber('5');
    component.equals();
    expect(component.display).toBe('20');
  });

  it('should handle division', () => {
    component.inputNumber('20');
    component.inputOperator('/');
    component.inputNumber('4');
    component.equals();
    expect(component.display).toBe('5');
  });

  it('should handle division by zero', () => {
    component.inputNumber('10');
    component.inputOperator('/');
    component.inputNumber('0');
    component.equals();
    expect(component.display).toBe('0');
  });

  // ============================================
  // Clear Functionality Tests
  // ============================================
  it('should clear display and reset state', () => {
    component.inputNumber('5');
    component.inputOperator('+');
    component.clear();
    expect(component.display).toBe('0');
    expect(component.previousValue).toBeNull();
    expect(component.operation).toBeNull();
  });

  // ============================================
  // UI Rendering Tests
  // ============================================
  it('should display calculator title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h2Element = compiled.querySelector('h2');
    expect(h2Element?.textContent).toContain('Calculator');
  });

  it('should display current value in display', () => {
    component.display = '123';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const displayElement = compiled.querySelector('.display');
    expect(displayElement?.textContent).toContain('123');
  });

  // ============================================
  // UI Interaction Tests
  // ============================================
  it('should update display when number button is clicked', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const numberButton = Array.from(buttons).find(
      btn => btn.textContent === '5'
    ) as HTMLButtonElement;
    
    numberButton.click();
    fixture.detectChanges();
    
    expect(component.display).toBe('5');
  });

  it('should perform calculation when equals button is clicked', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    
    // Click 5
    const button5 = Array.from(buttons).find(btn => btn.textContent === '5') as HTMLButtonElement;
    button5.click();
    
    // Click +
    const buttonPlus = Array.from(buttons).find(btn => btn.textContent === '+') as HTMLButtonElement;
    buttonPlus.click();
    
    // Click 3
    const button3 = Array.from(buttons).find(btn => btn.textContent === '3') as HTMLButtonElement;
    button3.click();
    
    // Click =
    const buttonEquals = Array.from(buttons).find(btn => btn.textContent === '=') as HTMLButtonElement;
    buttonEquals.click();
    fixture.detectChanges();
    
    expect(component.display).toBe('8');
  });

  it('should clear when C button is clicked', () => {
    component.display = '123';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const clearButton = compiled.querySelector('button') as HTMLButtonElement;
    
    clearButton.click();
    fixture.detectChanges();
    
    expect(component.display).toBe('0');
  });

  // ============================================
  // Edge Cases Tests
  // ============================================
  it('should handle multiple operations', () => {
    component.inputNumber('10');
    component.inputOperator('+');
    component.inputNumber('5');
    component.inputOperator('*');
    component.inputNumber('2');
    component.equals();
    expect(component.display).toBe('30');
  });

  it('should handle decimal results', () => {
    component.inputNumber('7');
    component.inputOperator('/');
    component.inputNumber('2');
    component.equals();
    expect(parseFloat(component.display)).toBe(3.5);
  });
});

