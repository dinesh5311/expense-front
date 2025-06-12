import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense';
import { ToastService } from '../shared/toast';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-expense',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.scss'
})
export class AddExpense {
expenseForm: FormGroup;
isSubmitting = false;


  constructor(private fb: FormBuilder  , private expenseService: ExpenseService ,
              private toastService: ToastService , private router: Router) {
                
    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
  if (this.expenseForm.valid) {
    this.isSubmitting = true;

    const expenseData = this.expenseForm.value;
    this.expenseService.addExpense(expenseData).subscribe({
      next: (response) => {
        this.toastService.show('Expense saved! Redirecting to Dashboard', 'success');
        console.log('Expense added:', response);

        // ✅ Show toast immediately
        this.toastService.show('Expense saved! Redirecting to Dashboard', 'success');
        this.expenseForm.reset();

        this.isSubmitting = false; 

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error adding expense:', error);
        this.toastService.show('Error Occurred', 'error');
        this.isSubmitting = false;
      }
    });
  } else {
    this.expenseForm.markAllAsTouched();
  }
}


}
