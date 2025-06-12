import { Routes } from '@angular/router';
import { Header } from './header/header';
import { AddExpense } from './add-expense/add-expense';
import { Personal } from './personal/personal';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'add', component: AddExpense },
  { path: 'buulovespuchuu', component: Personal },
];
