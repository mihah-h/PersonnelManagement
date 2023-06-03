import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAttribute]',
  host: {
    '(click)': 'onClick()',
    '(focus)': 'focus()'
  }
})
export class AttributeDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }
  click() {
    this.el.nativeElement.style.color = '#3B82F6'
  }
}
