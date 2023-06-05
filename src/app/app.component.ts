import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private cfr: ComponentFactoryResolver,
    private view: ViewContainerRef
  ){}

  title = 'PersonnelManagement';
}
