import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { setField, setGroup } from 'src/app/state/actions/form.state.actions';
import { registrationFormState } from 'src/app/state/form.state';
import { registration_Form_Model } from 'src/app/state/models/form.state.model';

@Injectable()
export class FormStateManagerService {
  cached_In_Storage?: registration_Form_Model;

  constructor(private store: Store) {
    console.log('constructor');
    window.onbeforeunload = (event) => {
      console.log('before load');
      let cachedData = store.snapshot().registration_Form;
      localStorage.setItem('Form_Cache', JSON.stringify(cachedData));
    };
  }

  getCachedValue(form: FormGroup) {
    this.store.selectOnce(registrationFormState).subscribe((state) => {
      Object.entries(state).forEach(([name, value]) => {
        if (form.get(name)) {
          if (value) {
            let control = form.get(name);
            control!.setValue(value);
            control!.markAsDirty();
          } else {
            if (this.cached_In_Storage === undefined) {
              // console.log('in local storage');
              this.cached_In_Storage = JSON.parse(
                localStorage.getItem('Form_Cache') || 'null'
              );
            }
            if (
              this.cached_In_Storage &&
              (this.cached_In_Storage as any)[name]
            ) {
              this.store.dispatch(new setGroup(this.cached_In_Storage));
              let control = form.get(name);
              control!.setValue((this.cached_In_Storage as any)[name]);
              control!.markAsDirty();
            }
          }
        }
      });
    });
  }

  listenToChanges(form: FormGroup, onDestroy: Observable<any>) {
    Object.entries(form.controls).forEach(([name, control]) => {
      control.valueChanges.pipe(takeUntil(onDestroy)).subscribe((value) => {
        this.store.dispatch(new setField(name, value));
      });
    });
  }
}
