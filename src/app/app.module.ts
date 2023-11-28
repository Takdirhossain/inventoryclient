import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './module/nav/nav/nav.component';
import { SidebarComponent } from './module/sidebar/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home/home.component';
import { RecentselsComponent } from './module/recentsels/recentsels/recentsels/recentsels.component';
import { CustomersComponent } from './pages/customers/customers/customers/customers.component';
import { EditCustomerComponent } from './pages/customers/editCustomer/edit-customer.component';
import { DeleteCustomerComponent } from './pages/customers/deleteCustomer/delete-customer.component';
import { SalesComponent } from './pages/sales/sales/sales.component';
import { DeletesaleComponent } from './pages/sales/deleteSales/deletesale.component';
import { EditsalesComponent } from './pages/sales/editSales/editsales.component';
import { AuthComponent } from './pages/auth/auth/auth.component';
import { StockComponent } from './pages/stock/stock/stock.component';
import { EditStockComponent } from './pages/stock/edit-stock/edit-stock.component';
import { SeleteStockComponent } from './pages/stock/selete-stock/selete-stock.component';
import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConstantsComponent } from './pages/constants/constants/constants.component';
import { ProfitComponent } from './pages/profitlist/profit/profit.component';
import { ReportComponent } from './pages/report/report/report.component';
import { ExpenseComponent } from './pages/expense/expense/expense.component';
import { EditexpenseComponent } from './pages/expense/editexpense/editexpense.component';
import { DeleteexpenseComponent } from './pages/expense/deleteexpense/deleteexpense.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    HomeComponent,
    RecentselsComponent,
    CustomersComponent,
    EditCustomerComponent,
    DeleteCustomerComponent,
    SalesComponent,
    DeletesaleComponent,
    EditsalesComponent,
    AuthComponent,
    StockComponent,
    EditStockComponent,
    SeleteStockComponent,
    ConstantsComponent,
    ProfitComponent,
    ReportComponent,
    ExpenseComponent,
    EditexpenseComponent,
    DeleteexpenseComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
FormsModule,
ReactiveFormsModule,
BrowserAnimationsModule, // required animations module
ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [DecimalPipe, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
