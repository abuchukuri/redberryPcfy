import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[CustomStep]',
  exportAs: 'CustomStep',
})
export class CustomStepDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
