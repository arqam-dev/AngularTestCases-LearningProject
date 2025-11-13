import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfileComponent {
  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  userAge = 25;
  isEditing = false;

  editProfile(): void {
    this.isEditing = true;
  }

  saveProfile(): void {
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  updateName(newName: string): void {
    this.userName = newName;
  }

  updateEmail(newEmail: string): void {
    this.userEmail = newEmail;
  }

  updateAge(newAge: number): void {
    this.userAge = newAge;
  }

  incrementAge(): void {
    this.userAge++;
  }

  decrementAge(): void {
    if (this.userAge > 0) {
      this.userAge--;
    }
  }
}

