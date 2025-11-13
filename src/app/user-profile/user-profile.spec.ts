import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  // ============================================
  // Component Creation Tests
  // ============================================
  it('should create the user profile component', () => {
    expect(component).toBeTruthy();
  });

  // ============================================
  // Initial State Tests
  // ============================================
  it('should initialize with default user data', () => {
    expect(component.userName).toBe('John Doe');
    expect(component.userEmail).toBe('john.doe@example.com');
    expect(component.userAge).toBe(25);
  });

  it('should initialize with isEditing as false', () => {
    expect(component.isEditing).toBe(false);
  });

  // ============================================
  // Profile Update Tests
  // ============================================
  it('should update user name', () => {
    component.updateName('Jane Smith');
    expect(component.userName).toBe('Jane Smith');
  });

  it('should update user email', () => {
    component.updateEmail('jane.smith@example.com');
    expect(component.userEmail).toBe('jane.smith@example.com');
  });

  it('should update user age', () => {
    component.updateAge(30);
    expect(component.userAge).toBe(30);
  });

  // ============================================
  // Edit Mode Tests
  // ============================================
  it('should enable edit mode when editProfile is called', () => {
    component.editProfile();
    expect(component.isEditing).toBe(true);
  });

  it('should disable edit mode when saveProfile is called', () => {
    component.isEditing = true;
    component.saveProfile();
    expect(component.isEditing).toBe(false);
  });

  it('should disable edit mode when cancelEdit is called', () => {
    component.isEditing = true;
    component.cancelEdit();
    expect(component.isEditing).toBe(false);
  });

  // ============================================
  // Age Control Tests
  // ============================================
  it('should increment age', () => {
    component.incrementAge();
    expect(component.userAge).toBe(26);
    component.incrementAge();
    expect(component.userAge).toBe(27);
  });

  it('should decrement age', () => {
    component.decrementAge();
    expect(component.userAge).toBe(24);
  });

  it('should not decrement age below 0', () => {
    component.userAge = 0;
    component.decrementAge();
    expect(component.userAge).toBe(0);
  });

  // ============================================
  // UI Rendering Tests
  // ============================================
  it('should display user profile title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h2Element = compiled.querySelector('h2');
    expect(h2Element?.textContent).toContain('User Profile');
  });

  it('should display user name in view mode', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('John Doe');
  });

  it('should display user email in view mode', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('john.doe@example.com');
  });

  it('should display user age in view mode', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('25');
  });

  it('should show edit form when in edit mode', () => {
    component.isEditing = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });

  // ============================================
  // UI Interaction Tests
  // ============================================
  it('should enable edit mode when Edit Profile button is clicked', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const editButton = Array.from(compiled.querySelectorAll('button')).find(
      btn => btn.textContent === 'Edit Profile'
    ) as HTMLButtonElement;
    
    editButton.click();
    fixture.detectChanges();
    
    expect(component.isEditing).toBe(true);
  });

  it('should save changes when Save button is clicked', () => {
    component.isEditing = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const saveButton = Array.from(compiled.querySelectorAll('button')).find(
      btn => btn.textContent === 'Save'
    ) as HTMLButtonElement;
    
    saveButton.click();
    fixture.detectChanges();
    
    expect(component.isEditing).toBe(false);
  });

  it('should update name when input value changes', () => {
    component.isEditing = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    const nameInput = inputs[0] as HTMLInputElement;
    
    nameInput.value = 'New Name';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    
    expect(component.userName).toBe('New Name');
  });

  it('should increment age when + button is clicked', () => {
    component.isEditing = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    const plusButton = Array.from(buttons).find(
      btn => btn.textContent === '+'
    ) as HTMLButtonElement;
    
    const initialAge = component.userAge;
    plusButton.click();
    fixture.detectChanges();
    
    expect(component.userAge).toBe(initialAge + 1);
  });

  // ============================================
  // Edge Cases Tests
  // ============================================
  it('should handle empty name update', () => {
    component.updateName('');
    expect(component.userName).toBe('');
  });

  it('should handle very large age values', () => {
    component.updateAge(1000);
    expect(component.userAge).toBe(1000);
  });
});

