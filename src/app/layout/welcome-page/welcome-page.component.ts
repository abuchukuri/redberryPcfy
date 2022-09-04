import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { reset } from 'src/app/state/actions/form.state.actions';
import { registrationFormState } from 'src/app/state/form.state';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(public route: Router, private store: Store) {}

  ngOnInit(): void {}
}
