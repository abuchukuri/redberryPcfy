import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import { PcRegistrationFormComponent } from './components/pc-registration-form/pc-registration-form.component';
import { EmployeeRegistrationFormComponent } from './components/employee-registration-form/employee-registration-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SuccessPopupComponent } from './components/success-popup/success-popup.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayControllerService } from './services/overlay-controller/overlay-controller.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormGeneralHelperService } from './services/form-general-helper/form-general-helper.service';
import { FormStateManagerService } from './services/form-state-manager/form-state-manager.service';
import { FormCheckResolver } from 'src/app/resolvers/form-check.resolver';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'employee' },
      {
        path: 'pc',
        component: PcRegistrationFormComponent,
        resolve: [FormCheckResolver],
      },
      { path: 'employee', component: EmployeeRegistrationFormComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RegistrationFormComponent,
    PcRegistrationFormComponent,
    EmployeeRegistrationFormComponent,
    SuccessPopupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OverlayModule,
    DragDropModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    OverlayControllerService,
    FormGeneralHelperService,
    FormStateManagerService,
    OverlayControllerService,
  ],
  exports: [EmployeeRegistrationFormComponent],
})
export class RegistrationFormModule {}
