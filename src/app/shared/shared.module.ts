import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { EmployeeListItemComponent } from './components/employee-list-item/employee-list-item.component';
import { FiltrationFormComponent } from './components/filtration-form/filtration-form.component';
import { SortingPipe } from './pipes/sorting.pipe';
import { PaginationPipe } from './pipes/pagination.pipe';
import { ErrorMessageDynamicComponent } from './components/error-message-dynamic/error-message-dynamic.component';

@NgModule({
  imports: [

  ],
  exports: [

  ],
  declarations: [

  
    ErrorMessageDynamicComponent
  ],
})
export class SharedModule {

}
