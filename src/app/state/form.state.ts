import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { setField, setGroup } from './actions/form.state.actions';
import { registration_Form_Model } from './models/form.state.model';

@State<registration_Form_Model>({
  name: 'registration_Form',
  defaults: {
    name: null,
    surname: null,
    team_id: null,
    position_id: null,
    phone_number: null,
    email: null,
    laptop_name: null,
    laptop_image: null,
    laptop_brand_id: null,
    laptop_cpu: null,
    laptop_cpu_cores: null,
    laptop_cpu_threads: null,
    laptop_ram: null,
    laptop_hard_drive_type: null,
    laptop_state: null,
    laptop_purchase_date: null,
    laptop_price: null,
  },
})
@Injectable()
export class registrationFormState {
  @Selector()
  static registrationForm(state: registration_Form_Model) {
    return state;
  }
  @Selector()
  static getName(state: registration_Form_Model) {
    return state.name;
  }
  @Selector()
  static getLastName(state: registration_Form_Model) {
    return state.surname;
  }

  @Action(setField)
  setField(ctx: StateContext<registration_Form_Model>, action: setField) {
    ctx.patchState({ [action.field]: action.value });
  }

  @Action(setGroup)
  setGroup(ctx: StateContext<registration_Form_Model>, action: setGroup) {
    ctx.patchState({ ...action.group });
  }
}
