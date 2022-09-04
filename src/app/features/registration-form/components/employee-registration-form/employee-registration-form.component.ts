import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Position } from '../../models/position.model';
import { Team } from '../../models/team.model';
import { FormGeneralHelperService } from '../../services/form-general-helper/form-general-helper.service';
import { FormStateManagerService } from '../../services/form-state-manager/form-state-manager.service';

@Component({
  selector: 'app-employee-registration-form',
  templateUrl: './employee-registration-form.component.html',
  styleUrls: ['./employee-registration-form.component.scss'],
})
export class EmployeeRegistrationFormComponent
  implements AfterViewInit, OnDestroy
{
  teams: Team[] = [];
  positions: Position[] = [];
  filtered_positions: Position[] = [];
  employeeForm: FormGroup;
  onDestroySubject = new Subject<any>();

  get name() {
    return this.employeeForm.get('name')!;
  }
  get surname() {
    return this.employeeForm.get('surname')!;
  }
  get email() {
    return this.employeeForm.get('email')!;
  }
  get team_id() {
    return this.employeeForm.get('team_id')!;
  }
  get position_id() {
    return this.employeeForm.get('position_id')!;
  }
  get phone_number() {
    return this.employeeForm.get('phone_number')!;
  }
  constructor(
    private formBuilder: FormBuilder,
    private formHelper: FormGeneralHelperService,
    private route: Router,
    private active: ActivatedRoute,
    FormManager: FormStateManagerService
  ) {
    this.requestData();
    this.employeeForm = this.buildForm();
    FormManager.getCachedValue(this.employeeForm, this.onDestroySubject);
    FormManager.listenToChanges(
      this.employeeForm,
      this.onDestroySubject,
      'user'
    );
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
      (err) => alert('could not get an access to employee teams')
    );
    this.formHelper.getPosition().subscribe(
      (positions) => (
        (this.positions = positions.data),
        (this.filtered_positions = positions.data)
      ),
      (err) => alert('could not get an access to employee positions')
    );
  }

  ngAfterViewInit() {
    this.team_id.valueChanges.subscribe((team_id) => {
      this.position_id.reset();
      this.filtered_positions = this.positions.filter(
        (position) => position.team_id == team_id
      );
    });
  }

  onSubmit(event: Event) {
    if (this.employeeForm.valid) {
      this.route.navigate(['../pc'], { relativeTo: this.active });
    } else {
      alert('user information form is not complete');
    }
  }
}
