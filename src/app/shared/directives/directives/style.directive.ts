import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyle]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()'
  }

})
export class StyleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  onEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', '#3B82F6');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#3B82F6');
  }
  onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'border-color', '#93C5FD');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#93C5FD');
  }

}
