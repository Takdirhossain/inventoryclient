import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
