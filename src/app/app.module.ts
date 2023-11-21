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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    HomeComponent,
    RecentselsComponent,
    CustomersComponent
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
