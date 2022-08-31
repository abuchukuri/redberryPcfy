import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { brand } from '../../models/brand.model';
import { CPU } from '../../models/cpu.model';
import { FormGeneralHelperService } from '../../services/form-general-helper/form-general-helper.service';
import { FormStateManagerService } from '../../services/form-state-manager/form-state-manager.service';
import { OverlayControllerService } from '../../services/overlay-controller/overlay-controller.service';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';

@Component({
  selector: 'app-pc-registration-form',
  templateUrl: './pc-registration-form.component.html',
  styleUrls: ['./pc-registration-form.component.scss'],
})
export class PcRegistrationFormComponent implements AfterViewInit, OnDestroy {
  CPUs: CPU[] = [];
  brands: brand[] = [];
  laptopForm: FormGroup;
  onDestroySubject = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private formHelper: FormGeneralHelperService,
    private overlayService: OverlayControllerService,
    FormManager: FormStateManagerService
  ) {
    this.requestData();
    this.laptopForm = this.buildForm();
    FormManager.getCachedValue(this.laptopForm);
    FormManager.listenToChanges(this.laptopForm, this.onDestroySubject);
  }
  ngOnDestroy(): void {
    this.onDestroySubject.next(true);
  }
  buildForm() {
    return this.formBuilder.group({
      laptop_name: [
        ,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9!@#$%^&*()_+=]+$'),
        ],
      ],
      laptop_image: [, [Validators.required]],
      laptop_brand_id: [, [Validators.required]],
      laptop_cpu: [, [Validators.required]],
      laptop_cpu_cores: [
        ,
        [Validators.required, Validators.pattern('^[0-9]*')],
      ],
      laptop_cpu_threads: [
        ,
        [Validators.required, Validators.pattern('^[0-9]*')],
      ],
      laptop_ram: [, [Validators.required, Validators.pattern('^[0-9]*')]],
      laptop_hard_drive_type: [, [Validators.required]],
      laptop_state: [, [Validators.required]],
      laptop_purchase_date: [],
      laptop_price: [, [Validators.required, Validators.pattern('^[0-9]*')]],
    });
  }

  requestData() {
    this.formHelper.getCPUs().subscribe(
      (CPUs) => (this.CPUs = CPUs.data),
      (err) => alert('could not get an access to laptop CPUs')
    );
    this.formHelper.getBrands().subscribe(
      (brands) => (this.brands = brands.data),
      (err) => alert('could not get an access to laptop brands')
    );
  }

  ngAfterViewInit() {}

  onSubmit(event: Event) {
    if (this.laptopForm.valid) {
      this.onSuccess();
    } else {
      alert('registration form is not valid, please follow the instructions');
    }
  }

  onSuccess() {
    this.overlayService.create(SuccessPopupComponent, this.overlayService);
  }

  FileDropped(files: FileList, fileUploader: HTMLInputElement) {
    fileUploader.files = files;
  }
}
