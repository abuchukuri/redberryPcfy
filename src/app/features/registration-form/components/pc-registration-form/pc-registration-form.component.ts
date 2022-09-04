import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { LaptopsService } from 'src/app/features/pc-list/services/laptops/laptops.service';
import { reset } from 'src/app/state/actions/form.state.actions';
import { registrationFormState } from 'src/app/state/form.state';
import { registration_Form_Model } from 'src/app/state/models/form.state.model';
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

  @ViewChild('fileUploader') fileUploader?: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private formHelper: FormGeneralHelperService,
    private overlayService: OverlayControllerService,
    FormManager: FormStateManagerService,
    private laptopsService: LaptopsService,
    private store: Store
  ) {
    this.requestData();
    this.laptopForm = this.buildForm();
    FormManager.getCachedValue(this.laptopForm, this.onDestroySubject);
    FormManager.listenToChanges(
      this.laptopForm,
      this.onDestroySubject,
      'laptop'
    );
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

  loadImage(file: File) {
    console.log(file);
    console.log(document.getElementById('output'));
    (document.getElementById('output') as HTMLImageElement)!.src =
      window.URL.createObjectURL(file);
  }

  onSubmit(event: Event) {
    if (this.laptopForm.valid) {
      this.onSuccess();
    } else {
      alert('laptop information form is not complete');
    }
  }

  onSuccess() {
    if (this.laptopForm.valid) {
      let cache: registration_Form_Model = this.store.selectSnapshot(
        registrationFormState
      );
      let fileToUpload = this.fileUploader?.nativeElement.files[0];
      const formData: FormData = new FormData();
      let laptop = {
        ...cache.user,
        ...cache.laptop,
      };
      Object.entries(laptop).forEach(([name, value]) => {
        if (name !== 'laptop_purchase_date') formData.append(name, '' + value!);
      });
      formData.append('laptop_image', fileToUpload, fileToUpload.name);
      console.log(laptop);
      this.laptopsService
        .creat(formData)
        .subscribe((success: { message: String }) => {
          console.log(success);
          this.overlayService.create(
            SuccessPopupComponent,
            this.overlayService
          );
          this.store.dispatch(new reset());
          localStorage.removeItem('Form_Cache');
        });
    } else {
      alert('user information form is not complete');
    }
  }

  FileDropped(files: FileList, fileUploader: HTMLInputElement) {
    fileUploader.files = files;
    this.loadImage(files[0]);
  }
}
