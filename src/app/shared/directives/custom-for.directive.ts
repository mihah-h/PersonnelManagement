import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import {Employee} from "../interfaces/employeeInterfaces/employee";

@Directive({
  selector: '[appCustomFor]',
})
export class CustomForDirective implements OnChanges {
  @Input() appCustomForOf!: Array<Employee>;
  @Input() appCustomForCount!: number;
  @Input() appCustomForStart!: number;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<{$implicit: Employee}>
  ) {}

  ngOnChanges() {
    this.container.clear();
    const maxIndex = this.appCustomForStart + this.appCustomForCount;
    if (this.appCustomForStart > this.appCustomForOf.length){ return; }

    for (let i = this.appCustomForStart; i < maxIndex; i++) {
      if (i >= this.appCustomForOf.length) { break; }
      this.container.createEmbeddedView(this.template, {
        $implicit: this.appCustomForOf[i]
      });
    }
  }
}
