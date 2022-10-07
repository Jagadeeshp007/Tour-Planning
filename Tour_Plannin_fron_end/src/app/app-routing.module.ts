import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TourListComponent } from './tour-list/tour-list.component';
import { UpdateTourComponent } from './update-tour/update-tour.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'reg', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: TourListComponent },
  { path: 'add', component: CreateTourComponent },
  { path: 'update/:id', component: UpdateTourComponent },
  { path: 'detail/:id', component: DetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
