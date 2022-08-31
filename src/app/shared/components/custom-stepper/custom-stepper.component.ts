import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
} from '@angular/core';
import { CustomStepDirective } from '../../directives/custom-step.directive';

@Component({
  selector: 'app-custom-stepper',
  templateUrl: './custom-stepper.component.html',
  styleUrls: ['./custom-stepper.component.scss'],
})
export class CustomStepperComponent implements AfterViewInit {
  @Input() index = 0;
  @ContentChildren(CustomStepDirective)
  private steps: QueryList<CustomStepDirective> = new QueryList();
  stepsToArray: CustomStepDirective[] = [];
  next() {
    if (this.index < this.stepsToArray.length) this.index++;
  }

  previous() {
    if (this.index > 0) this.index--;
  }

  step(step: CustomStepDirective) {
    this.index = this.stepsToArray.indexOf(step);
  }

  isActive(step: CustomStepDirective) {
    return this.index === this.stepsToArray.indexOf(step);
  }

  constructor(private chdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.stepsToArray = this.steps!.toArray();
    this.chdr.detectChanges();
  }
}
