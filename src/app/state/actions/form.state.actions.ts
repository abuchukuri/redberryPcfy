import {
  employee_Model,
  laptop_Model,
  registration_Form_Model,
} from '../models/form.state.model';

export class setSegment {
  static readonly type = '[form] set segment';
  constructor(
    public segment: string,
    public value: employee_Model | laptop_Model,
    public valid: boolean
  ) {}
}

export class setUserValidation {
  static readonly type = '[form] set user validate';
  constructor(public valid: boolean) {}
}

export class setLaptopValidation {
  static readonly type = '[form] set laptop validate';
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
