import { Directive, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Employee } from '../interfaces/employee-interfaces';

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
    let maxIndex = this.appCustomForStart + this.appCustomForCount;

    for (let i = this.appCustomForStart; i < maxIndex; i++) {
      if (i >= this.appCustomForOf.length) { break; }
      this.container.createEmbeddedView(this.template, {
        $implicit: this.appCustomForOf[i]
      });
    }
  }
}
