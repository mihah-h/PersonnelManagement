import {ErrorHandler, Injectable, ViewContainerRef} from '@angular/core';
import {ErrorMessageDynamicComponent} from "../components/error-message-dynamic/error-message-dynamic.component";
import {ErrorMessageDynamicService} from "./error-message-dynamic.service";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private errorMessage: ErrorMessageDynamicService) {
  }

  handleError(error: { message: any; }) {
    this.errorMessage.showErrorMessage()
    console.log(error)
  }

}
