import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-error-message-dynamic',
  templateUrl: './error-message-dynamic.component.html',
  styleUrls: ['./error-message-dynamic.component.css'],
})
export class ErrorMessageDynamicComponent {

  @Input()
  public message = 'error'
  @Output()
  closeErrorMessage = new EventEmitter<void>()

}
