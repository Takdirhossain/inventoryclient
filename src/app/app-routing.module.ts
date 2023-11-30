import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './module/nav/nav/nav.component';
import { HomeComponent } from './pages/home/home/home.component';
import { CustomersComponent } from './pages/customers/customers/customers.component';
import { SalesComponent } from './pages/sales/sales/sales.component';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { StockComponent } from './pages/stock/stock/stock.component';
import { ConstantsComponent } from './pages/constants/constants/constants.component';
import { ProfitComponent } from './pages/profitlist/profit/profit.component';
import { ReportComponent } from './pages/report/report/report.component';
import { ExpenseComponent } from './pages/expense/expense/expense.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'stock', component: StockComponent },
  { path: 'constants', component: ConstantsComponent },
  { path: 'profit', component: ProfitComponent },
  { path: 'report/:id', component: ReportComponent },
  {path: 'expense', component: ExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
