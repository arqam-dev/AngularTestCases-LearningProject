import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator';
import { UserProfileComponent } from './user-profile/user-profile';

@Component({
  selector: 'app-root',
  imports: [CalculatorComponent, UserProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Angular Test Cases App';
}
