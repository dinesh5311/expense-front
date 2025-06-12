import { Component } from '@angular/core';
import { Expense, ExpenseService } from '../expense';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastService } from '../shared/toast';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  currentMonth: string = "JUNE"
  currentMonthExpense: Expense[] = [];
  lastMonthExpense: Expense[] = [];
  LifetimeExpenses: Expense[] = [];
  total_amount_this_month: number = 0;
  total_amount_last_month: number = -0;
  total_amount_lifetime: number = -0;
  constructor(private expenseService: ExpenseService, private cdRef: ChangeDetectorRef ,private toastService: ToastService) { }

  ngOnInit() {


    this.getCurrentMonthExpense();
    this.getLastMonthExpense();
    this.getLifetimeExpense();


  }

  getCurrentMonthExpense() {
    const fromDate = this.getFirstDateOfCurrentMonth();
    const toDate = this.getCurrentDate();
    this.expenseService.getExpenses(fromDate, toDate).subscribe(data => {
      this.currentMonthExpense = data;
      this.calculateTotalThisMonth();
      this.cdRef.detectChanges();
    });
  }
  getLastMonthExpense() {
    const fromDate = this.getFirstDateOfLastMonth()
    const toDate = this.getLastDateOfLastMonth()
    this.expenseService.getExpenses(fromDate, toDate).subscribe(data => {
      this.lastMonthExpense = data;
      this.calculateTotalLastMonth();
      this.cdRef.detectChanges();
    });
  }
  getLifetimeExpense() {

    const fromDate = '2025-06-01';
    const toDate = this.getCurrentDate()

    this.expenseService.getExpenses(fromDate, toDate).subscribe(data => {
      this.LifetimeExpenses = data;
      this.calculateLifetime();
      this.cdRef.detectChanges();
    });
  }
  calculateTotalThisMonth(): void {
    this.total_amount_this_month = this.currentMonthExpense.reduce((sum, expense) => sum + Number(expense.amount), 0);
    console.log('calculateTotal called, totalAmount:', this.total_amount_this_month);
  }
  calculateTotalLastMonth(): void {
    this.total_amount_last_month = this.lastMonthExpense.reduce((sum, expense) => sum + Number(expense.amount), 0);
    console.log('calculateTotal called, totalAmount:', this.total_amount_last_month);
  }
  calculateLifetime(): void {
    this.total_amount_lifetime = this.LifetimeExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    console.log('calculateTotal called, totalAmount:', this.total_amount_lifetime);
  }
  getCurrentMonthAndYear(): string {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const currentDate = new Date();
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${month} ${year}`;
  }
  getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCurrentDateFormatted(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month 0-11 hota hai, isliye +1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getFirstDateOfCurrentMonth(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = '01';  // Pehli date hamesha 01 hoti hai

    return `${year}-${month}-${day}`;
  }

  getFirstDateOfLastMonth(): string {
    const date = new Date();
    // Last month ke liye month ko 1 kam karo
    date.setMonth(date.getMonth() - 1);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = '01';

    return `${year}-${month}-${day}`;
  }
  getLastDateOfLastMonth(): string {
    const date = new Date();
    // Is mahine ke pehle din se 1 din pehle, yani last month ka aakhri din
    date.setDate(1);        // Is mahine ki pehli date set karo
    date.setHours(-1);      // 1 hour pehle karenge to pichle mahine ki last date milegi

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
