import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
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
  constructor(
    private store: Store,
    private router: Router,
    private active: ActivatedRoute
  ) {}
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
      this.router.navigate(['/homePage/registration-form/employee']);
      alert('user information form is not complete');
    }
    return of(true);
  }
}
