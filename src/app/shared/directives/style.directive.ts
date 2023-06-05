import { Directive,  HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appStyle]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()'
  }

})
export class StyleDirective {

  @Input() dStyles: { borderColor?: string, backgroundColor?: string, color?: string };

  @HostBinding('style.borderColor') elBorderColor: string | undefined | null = null;
  @HostBinding('style.backgroundColor') elBackgroundColor: string | undefined | null = null;
  @HostBinding('style.color') elColor: string | undefined | null = null;

  constructor() {

  }

  onEnter() {
    this.elBorderColor = this.dStyles.borderColor;
    this.elBackgroundColor = this.dStyles.backgroundColor;
    this.elColor = this.dStyles.color;
  }

  onLeave() {
    this.elBorderColor = null;
    this.elBackgroundColor = null;
    this.elColor = null;
  }

}
