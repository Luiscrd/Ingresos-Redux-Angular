import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresComponent } from './ingres/ingres.component';
import { StadisticComponent } from './ingres/stadistic/stadistic.component';
import { DetailComponent } from './ingres/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NabvarComponent } from './shared/nabvar/nabvar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresComponent,
    StadisticComponent,
    DetailComponent,
    FooterComponent,
    NabvarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
