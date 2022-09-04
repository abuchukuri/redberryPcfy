import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { registrationFormState } from '../state/form.state';

@Injectable({
  providedIn: 'root',
})
export class FormCheckResolver implements Resolve<boolean> {
  constructor(private store: Store, private router: Router) {}

  // when navigating to laptop registration form
  // check store or local storage,
  // if users form valid continue navigation,
  // else redirect to user registration form
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let formState = this.store.selectSnapshot(registrationFormState);
    if (!formState.dirty) {
      let cache = localStorage.getItem('Form_Cache');
      if (cache) formState = JSON.parse(cache);
    }

    if (!formState.user_valid) {
      this.router.navigate(['/Dash/registration-form/user']);
      alert('user information form is not complete');
    }
    return of(true);
  }
}
