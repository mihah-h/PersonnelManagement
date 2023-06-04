import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyle]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()'
  }

})
export class StyleDirective {
  @Input() dStyles: { borderColor?: string, backgroundColor?: string, color?: string };
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }
  onEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', this.dStyles.borderColor);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.dStyles.backgroundColor);
    this.renderer.setStyle(this.el.nativeElement, 'color', this.dStyles.color);
  }
  onLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'borderColor', null);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', null);
    this.renderer.setStyle(this.el.nativeElement, 'color', null);
  }

}
