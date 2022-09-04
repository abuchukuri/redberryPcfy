import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  reset,
  setDirty,
  setForm,
  setLaptopValidation,
  setSegment,
  setUserValidation,
} from './actions/form.state.actions';
import { registration_Form_Model } from './models/form.state.model';

const initialData = {
  user: {
    name: null,
    surname: null,
    team_id: null,
    position_id: null,
    phone_number: null,
    email: null,
  },
  laptop: {
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
  user_valid: false,
  laptop_valid: false,
  dirty: false,
};

@State<registration_Form_Model>({
  name: 'registration_Form',
  defaults: initialData,
})
@Injectable()
export class registrationFormState {
  @Selector()
  static registrationForm(state: registration_Form_Model) {
    return state;
  }

  @Action(setSegment)
  setSegment(ctx: StateContext<registration_Form_Model>, action: setSegment) {
    ctx.patchState({
      [action.segment]: action.value,
      [action.segment + '_valid']: action.valid,
      dirty: true,
    });
  }

  @Action(setUserValidation)
  setUserValidation(
    ctx: StateContext<registration_Form_Model>,
    action: setUserValidation
  ) {
    ctx.patchState({
      user_valid: action.valid,
    });
  }

  @Action(setLaptopValidation)
  setLaptopValidation(
    ctx: StateContext<registration_Form_Model>,
    action: setLaptopValidation
  ) {
    ctx.patchState({
      laptop_valid: action.valid,
    });
  }

  @Action(setForm)
  setForm(ctx: StateContext<registration_Form_Model>, action: setForm) {
    ctx.setState(action.form);
  }

  @Action(setDirty)
  setDirty(ctx: StateContext<registration_Form_Model>, action: setDirty) {
    ctx.dispatch({ dirty: action.dirty });
  }

  @Action(reset)
  reset(ctx: StateContext<registration_Form_Model>, action: reset) {
    ctx.setState(initialData);
  }
}
