import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense';
@Component({
  selector: 'app-add-expense',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss'
})
export class AddExpense {
expenseForm: FormGroup;

  constructor(private fb: FormBuilder  , private expenseService: ExpenseService ) {
    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const expenseData = this.expenseForm.value;
      console.log('Form Data:', expenseData);
       this.expenseService.addExpense(expenseData).subscribe({
      next: (response) => {
        console.log('Expense added:', response);
        // Optional: Form reset ya success message show karna
        this.expenseForm.reset();
      },
      error: (error) => {
        console.error('Error adding expense:', error);
        // Optional: User ko error feedback dena
      }
    });
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }
}
