export class setField {
  static readonly type = '[form] set field';
  constructor(public field: string, public value: any) {}
}

export class setGroup {
  static readonly type = '[form] set group';
  constructor(public group: any) {}
}
