import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class CalculatorComponent {
  display = '0';
  previousValue: number | null = null;
  operation: string | null = null;
  waitingForNewValue = false;

  inputNumber(num: string): void {
    if (this.waitingForNewValue) {
      this.display = num;
      this.waitingForNewValue = false;
    } else {
      this.display = this.display === '0' ? num : this.display + num;
    }
  }

  inputOperator(op: string): void {
    const currentValue = parseFloat(this.display);

    if (this.previousValue === null) {
      this.previousValue = currentValue;
    } else if (this.operation) {
      const result = this.calculate();
      this.display = String(result);
      this.previousValue = result;
    }

    this.waitingForNewValue = true;
    this.operation = op;
  }

  calculate(): number {
    const currentValue = parseFloat(this.display);
    let result = 0;

    if (this.previousValue !== null) {
      switch (this.operation) {
        case '+':
          result = this.previousValue + currentValue;
          break;
        case '-':
          result = this.previousValue - currentValue;
          break;
        case '*':
          result = this.previousValue * currentValue;
          break;
        case '/':
          result = currentValue !== 0 ? this.previousValue / currentValue : 0;
          break;
        default:
          result = currentValue;
      }
    }

    return result;
  }

  equals(): void {
    if (this.operation && this.previousValue !== null) {
      const result = this.calculate();
      this.display = String(result);
      this.previousValue = null;
      this.operation = null;
      this.waitingForNewValue = true;
    }
  }

  clear(): void {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForNewValue = false;
  }
}

