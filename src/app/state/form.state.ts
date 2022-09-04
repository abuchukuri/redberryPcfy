// import { Injectable } from '@angular/core';
// import { Action, Selector, State, StateContext } from '@ngxs/store';
// import { setField, setGroup } from './actions/form.state.actions';
// import { registration_Form_Model } from './models/form.state.model';

// const initialData = {
//   name: null,
//   surname: null,
//   team_id: null,
//   position_id: null,
//   phone_number: null,
//   email: null,
//   laptop_name: null,
//   laptop_image: null,
//   laptop_brand_id: null,
//   laptop_cpu: null,
//   laptop_cpu_cores: null,
//   laptop_cpu_threads: null,
//   laptop_ram: null,
//   laptop_hard_drive_type: null,
//   laptop_state: null,
//   laptop_purchase_date: null,
//   laptop_price: null,
// };

// @State<registration_Form_Model>({
//   name: 'registration_Form',
//   defaults: null,
// })
// @Injectable()
// export class registrationFormState {
//   @Selector()
//   static registrationForm(state: registration_Form_Model) {
//     return state;
//   }
//   @Selector()
//   static getName(state: registration_Form_Model) {
//     return state?.name;
//   }
//   @Selector()
//   static getLastName(state: registration_Form_Model) {
//     return state?.surname;
//   }

//   @Action(setField)
//   setField(ctx: StateContext<registration_Form_Model>, action: setField) {
//     let state = ctx.getState();
//     if (!state) {
//       ctx.setState({ ...initialData });
//     }
//     ctx.patchState({ [action.field]: action.value });
//   }

//   @Action(setGroup)
//   setGroup(ctx: StateContext<registration_Form_Model>, action: setGroup) {
//     ctx.setState(action.group);
//   }

//   // @Action(initiate)
//   // initiate(ctx: StateContext<registration_Form_Model>, action: initiate) {
//   //   ctx.setState({ ...initialData });
//   // }
// }

import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  reset,
  setDirty,
  setForm,
  setFormValidation,
  setLaptop,
  setLaptopValidation,
  setSegment,
  setUser,
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
  valid: false,
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

  @Selector()
  static userForm(state: registration_Form_Model) {
    return state.user;
  }

  @Selector()
  static laptopForm(state: registration_Form_Model) {
    return state.laptop;
  }

  @Action(setSegment)
  setSegment(ctx: StateContext<registration_Form_Model>, action: setSegment) {
    ctx.patchState({
      [action.segment]: action.value,
      [action.segment + '_valid']: action.valid,
      dirty: true,
    });
  }

  @Action(setUser)
  setUser(ctx: StateContext<registration_Form_Model>, action: setUser) {
    ctx.patchState({
      user: action.user,
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

  @Action(setLaptop)
  setLaptop(ctx: StateContext<registration_Form_Model>, action: any) {
    ctx.patchState({
      laptop: action.laptop,
      dirty: true,
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

  @Action(setFormValidation)
  setFormValidation(
    ctx: StateContext<registration_Form_Model>,
    action: setFormValidation
  ) {
    ctx.patchState({
      valid: action.valid,
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
