import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  count = 0;
  message = 'Welcome to Angular Test Cases';

  increment(): void {
    this.count++;
  }

  decrement(): void {
    this.count--;
  }

  reset(): void {
    this.count = 0;
  }

  updateMessage(newMessage: string): void {
    this.message = newMessage;
  }
}
