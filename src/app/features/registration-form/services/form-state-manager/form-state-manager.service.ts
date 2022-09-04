import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { debounceTime, Observable, takeUntil } from 'rxjs';
import { setForm, setSegment } from 'src/app/state/actions/form.state.actions';
import { registrationFormState } from 'src/app/state/form.state';

@Injectable()
export class FormStateManagerService {
  private checked_is_storage = false;
  public isValid = false;

  constructor(private store: Store) {
    this.cacheOnLocalStorage();
  }

  //before every unload/refresh checks store for cashed value, if found caches it in local storage
  private cacheOnLocalStorage() {
    window.onbeforeunload = (event) => {
      let cached = this.store.snapshot().registration_Form;
      if (cached) {
        this.checked_is_storage = false;
        localStorage.setItem('Form_Cache', JSON.stringify(cached));
      }
    };
  }

  //checks store for cashed value once, if not found checked local storage, if found sets form control values to cached values
  public getCachedValue(form: FormGroup, onDestroy: Observable<any>) {
    this.store
      .selectOnce(registrationFormState)
      .pipe(takeUntil(onDestroy))
      .subscribe((state) => {
        let cached_Data = state;
        if (!cached_Data.dirty && !this.checked_is_storage) {
          this.checked_is_storage = true;
          let cached = localStorage.getItem('Form_Cache');
          cached_Data = cached ? JSON.parse(cached) : null;
          if (cached_Data) this.store.dispatch(new setForm(cached_Data));
        }
        if (cached_Data.dirty) {
          Object.entries({
            ...cached_Data.user,
            ...cached_Data.laptop,
          }).forEach(([name, value]) => {
            if (value && form.get(name) && name !== 'laptop_image') {
              let control = form.get(name);
              control!.setValue(value);
              control!.markAsDirty();
            }
          });
        }
      });
  }

  //listens to form changes and stores values to store
  public listenToChanges(
    form: FormGroup,
    onDestroy: Observable<any>,
    segment: string
  ) {
    form.valueChanges
      .pipe(
        //can be set to more to reduce dispatch call count
        debounceTime(500),
        takeUntil(onDestroy)
      )
      .subscribe((value: any) => {
        this.store.dispatch(new setSegment(segment, value, form.valid));
      });
  }
}
