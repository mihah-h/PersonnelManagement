import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {GlobalErrorHandlerService} from "./shared/services/global-error-handler.service";
import {ErrorMessageDynamicService} from "./shared/services/error-message-dynamic.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{

  title = 'PersonnelManagement';

  @ViewChild('errorMessage', { read: ViewContainerRef })
  private viewRef: ViewContainerRef

  constructor(
    private ErrorMessageDynamic: ErrorMessageDynamicService
  ){}


  ngAfterViewInit(): void {
    this.ErrorMessageDynamic.initialize(this.viewRef)
  }

}
