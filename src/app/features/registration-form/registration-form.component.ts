import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements AfterViewInit {
  constructor(
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public chdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {}
}
