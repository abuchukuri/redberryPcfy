import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomStepperComponent } from './components/custom-stepper/custom-stepper.component';
import { CustomStepDirective } from './directives/custom-step.directive';
import { FileUploadDragDirective } from './directives/file-upload-drag/file-upload-drag.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CustomStepperComponent,
    CustomStepDirective,
    FileUploadDragDirective,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CustomStepperComponent,
    CustomStepDirective,
    FileUploadDragDirective,
    HttpClientModule,
  ],
})
export class SharedModule {}
