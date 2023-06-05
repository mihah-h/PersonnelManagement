import {Injectable, ViewContainerRef} from '@angular/core';
import {ErrorMessageDynamicComponent} from "../components/error-message-dynamic/error-message-dynamic.component";

@Injectable()
export class ErrorMessageDynamicService {

  viewContainer!: ViewContainerRef

  initialize(viewContainer: ViewContainerRef) {
    this.viewContainer = viewContainer
  }

  showErrorMessage(error: { message: any; }) {
      this.viewContainer.clear()
      const component = this.viewContainer.createComponent(ErrorMessageDynamicComponent)
      component.instance.closeErrorMessage.subscribe(() => {
        this.viewContainer.clear()
      })
  }
}
