import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { EmployeeListItemComponent } from './components/employee-list-item/employee-list-item.component';
import { FiltrationFormComponent } from './components/filtration-form/filtration-form.component';
import { SortingPipe } from './pipes/sorting.pipe';

@NgModule({
  imports: [

  ],
  exports: [

  ],
  declarations: [
  
    SortingPipe
  ],
})
export class SharedModule {

}
