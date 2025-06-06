import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Expense {
  id: number;
  name: string;
  amount: number;
  date: string; // ISO format: '2025-06-05'
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'https://expense-tracker-wbnq.onrender.com/expenses/';  // Update if hosted elsewhere

  constructor(private http: HttpClient) {}

  getExpenses(fromDate?: string, toDate?: string): Observable<Expense[]> {
    let params = new HttpParams();
    if (fromDate) params = params.set('from_date', fromDate);
    if (toDate) params = params.set('to_date', toDate);

    return this.http.get<Expense[]>(this.apiUrl, { params });
  }
   addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }
}
