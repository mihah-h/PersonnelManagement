import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-error-message-dynamic',
  templateUrl: './error-message-dynamic.component.html',
  styleUrls: ['./error-message-dynamic.component.css'],
})
export class ErrorMessageDynamicComponent {

  @Output()
  closeErrorMessage = new EventEmitter<void>()

}
