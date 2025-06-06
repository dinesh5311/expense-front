import { Routes } from '@angular/router';
import { Header } from './header/header';
import { Home } from './home/home';
import { AddExpense } from './add-expense/add-expense';
import { Personal } from './personal/personal';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Home },
  { path: 'add', component: AddExpense },
  { path: 'buulovespuchuu', component: Personal },
];
