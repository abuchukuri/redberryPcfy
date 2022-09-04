import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { WelcomePageComponent } from './layout/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent, pathMatch: 'full' },
  {
    path: 'Dash',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'registration-form', pathMatch: 'full' },
      {
        path: 'registration-form',
        loadChildren: () =>
          import(
            '../app/features/registration-form/registration-form.module'
          ).then((m) => m.RegistrationFormModule),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('../app/features/laptop-list/laptop-list.module').then(
            (m) => m.LaptopListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
