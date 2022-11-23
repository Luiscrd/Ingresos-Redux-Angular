import { Routes } from '@angular/router';
import { IngresComponent } from '../ingres/ingres.component';
import { StadisticComponent } from '../ingres/stadistic/stadistic.component';
import { DetailComponent } from '../ingres/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component: StadisticComponent },
  { path: 'ingesss', component: IngresComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
