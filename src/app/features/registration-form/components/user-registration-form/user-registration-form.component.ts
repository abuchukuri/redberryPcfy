import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Position } from '../../models/position.model';
import { Team } from '../../models/team.model';
import { FormGeneralHelperService } from '../../../../services/form-general-helper/form-general-helper.service';
import { FormStateManagerService } from '../../services/form-state-manager/form-state-manager.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements AfterViewInit, OnDestroy {
  teams: Team[] = [];
  positions: Position[] = [];
  filtered_positions: Position[] = [];
  userForm: FormGroup;
  onDestroySubject = new Subject<any>();

  get name() {
    return this.userForm.get('name')!;
  }
  get surname() {
    return this.userForm.get('surname')!;
  }
  get email() {
    return this.userForm.get('email')!;
  }
  get team_id() {
    return this.userForm.get('team_id')!;
  }
  get position_id() {
    return this.userForm.get('position_id')!;
  }
  get phone_number() {
    return this.userForm.get('phone_number')!;
  }
  constructor(
    private formBuilder: FormBuilder,
    private formHelper: FormGeneralHelperService,
    private route: Router,
    private active: ActivatedRoute,
    FormManager: FormStateManagerService,
    private chdr: ChangeDetectorRef
  ) {
    this.requestData();
    this.userForm = this.buildForm();
    FormManager.getCachedValue(this.userForm, this.onDestroySubject);
    FormManager.listenToChanges(this.userForm, this.onDestroySubject, 'user');
  }
  ngOnDestroy(): void {
    this.onDestroySubject.next('');
  }
  buildForm() {
    return this.formBuilder.group({
      name: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[ა-ჰ]+$'),
        ],
      ],
      surname: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern('^[ა-ჰ]+$'),
        ],
      ],
      team_id: [, [Validators.required]],
      position_id: [, [Validators.required]],
      email: [, [Validators.required, Validators.pattern('^.+@redberry.ge$')]],
      phone_number: [
        ,
        [Validators.required, Validators.pattern('^(([+])(995)(5)\\d{8})$')],
      ],
    });
  }

  requestData() {
    this.formHelper.getTeams().subscribe(
      (teams) => (this.teams = teams.data),
      (err) => alert('could not get an access to user teams')
    );
    this.formHelper.getPosition().subscribe(
      (positions) => (
        (this.positions = positions.data),
        (this.filtered_positions = this.team_id.value
          ? this.filterOptions(this.team_id.value)
          : positions.data)
      ),
      (err) => alert('could not get an access to user positions')
    );
  }

  ngAfterViewInit() {
    this.team_id.valueChanges.subscribe((team_id) => {
      this.position_id.reset();
      this.filtered_positions = this.filterOptions(team_id);
    });
  }

  onSubmit(event: Event) {
    if (this.userForm.valid) {
      this.route.navigate(['../laptop'], { relativeTo: this.active });
    } else {
      alert('user information form is not complete');
    }
  }

  filterOptions(team: number) {
    return this.positions.filter((position) => position.team_id == team);
  }
}
