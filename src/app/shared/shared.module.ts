import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadDragDirective } from './directives/file-upload-drag/file-upload-drag.directive';

@NgModule({
  declarations: [FileUploadDragDirective],
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
    FileUploadDragDirective,
    HttpClientModule,
  ],
})
export class SharedModule {}
