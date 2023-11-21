import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './module/nav/nav/nav.component';
import { HomeComponent } from './pages/home/home/home.component';
import { CustomersComponent } from './pages/customers/customers/customers/customers.component';
const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'dashboard', component: HomeComponent},
  {path:'customers', component: CustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
