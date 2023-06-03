import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAttribute]',
  host: {
    '(click)': 'onClick()'
  }
})
export class AttributeDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  onClick() {
    this.renderer.setStyle(this.el.nativeElement, 'color', '#1E293B');
  }

}
