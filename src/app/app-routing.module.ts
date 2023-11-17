import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavComponent } from './module/nav/nav/nav.component';
import { HomeComponent } from './pages/home/home/home.component';
const routes: Routes = [
  {path:'', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),  CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
