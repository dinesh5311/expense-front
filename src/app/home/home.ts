import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService, Expense } from "../expense"
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Table } from '../table/table';
import { take } from 'rxjs';
@Component({
  selector: 'app-home',
  imports: [RouterModule ,CommonModule , Table],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  expenses: Expense[] = [];
  currentMonth: any
  currentMonthExpense: any
  lastMonthExpense: any
  lifeTimeExpense: any
  constructor(private expenseService: ExpenseService) {

  }


  ngOnInit() {
    this.getExpense();
    this.getCurrentMonthExpense()
    this.getLastMonthExpense()
    this.currentMonth = this.getCurrentMonthAndYear()
  }

  getExpense() {
    const fromDate = '2025-06-01';
    const toDate = this.getCurrentDate()

    this.expenseService.getExpenses(fromDate, toDate).subscribe(data => {
      this.expenses = data;
      this.lifeTimeExpense = data.reduce((sum, item) => sum + item.amount, 0);
    });
  }
  getCurrentMonthExpense() {
    const fromDate = this.getFirstDateOfCurrentMonth();
    const toDate = this.getCurrentDate();
    this.expenseService.getExpenses(fromDate, toDate).subscribe(data => {

      this.currentMonthExpense = data.reduce((sum, item) => sum + item.amount, 0);

    });
  }
  getLastMonthExpense() {
    const fromDate = this.getFirstDateOfLastMonth()
    const toDate = this.getLastDateOfLastMonth()
    this.expenseService.getExpenses(fromDate, toDate).subscribe(data => {

      this.lastMonthExpense = data.reduce((sum, item) => sum + item.amount, 0);


    });
  }



  // utility-functions
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
