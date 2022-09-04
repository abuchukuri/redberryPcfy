// export class setField {
//   static readonly type = '[form] set field';
//   constructor(public field: string, public value: any) {}
// }

// export class setGroup {
//   static readonly type = '[form] set group';
//   constructor(public group: any) {}
// }

// // export class initiate {
// //   static readonly type = '[form] initiate';
// //   constructor() {}
// // }

import {
  employee_Model,
  laptop_Model,
  registration_Form_Model,
} from '../models/form.state.model';

export class setField {
  static readonly type = '[form] set field';
  constructor(public field: string, public value: any) {}
}

export class setSegment {
  static readonly type = '[form] set segment';
  constructor(
    public segment: string,
    public value: employee_Model | laptop_Model,
    public valid: boolean
  ) {}
}

export class setUser {
  static readonly type = '[form] set user';
  constructor(public user: employee_Model) {}
}

export class setLaptop {
  static readonly type = '[form] set laptop';
  constructor(public laptop: laptop_Model) {}
}

export class setUserValidation {
  static readonly type = '[form] set user validate';
  constructor(public valid: boolean) {}
}

export class setLaptopValidation {
  static readonly type = '[form] set laptop validate';
  constructor(public valid: boolean) {}
}

export class setFormValidation {
  static readonly type = '[form] set form validate';
  constructor(public valid: boolean) {}
}

export class setForm {
  static readonly type = '[form] set form validate';
  constructor(public form: registration_Form_Model) {}
}

export class setDirty {
  static readonly type = '[form] set dirty';
  constructor(public dirty: boolean) {}
}

export class reset {
  static readonly type = '[form] reset';
  constructor() {}
}
