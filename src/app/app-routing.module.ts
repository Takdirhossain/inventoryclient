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
import { MainlayoutComponent } from './mainlayout/mainlayout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { CollectionComponent } from './pages/collection/collection.component';
import { InvoiceComponent } from './module/invoice/invoice.component';
const routes: Routes = [
  {
    path: 'auth/dashboard',
    component: MainlayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // ...
      { path: 'home', component: HomeComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'stock', component: StockComponent },
      { path: 'constants', component: ConstantsComponent },
      { path: 'profit', component: ProfitComponent },
      { path: 'report/:id', component: ReportComponent },
      { path: 'expense', component: ExpenseComponent },
      {path: 'collection', component: CollectionComponent}
      // ...
    ],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: AuthComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
