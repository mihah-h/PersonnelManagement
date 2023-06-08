import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {Employee} from "../../interfaces/employeeInterfaces/employee";
import {EmployeeService} from "../../services/employee.service";
import {AdminInformation} from "../../interfaces/admin-interfaces/adminInformation";
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-refactor-compony-name-popup-window',
  templateUrl: './refactor-company-name-popup-window.component.html',
  styleUrls: ['./refactor-company-name-popup-window.component.css']
})
export class RefactorCompanyNamePopupWindowComponent implements OnInit, OnDestroy{

  dataEditingForm!: FormGroup
  putAdminInformationSub!: Subscription

  @Input()
  adminInformation: AdminInformation
  @Output()
  closePopupWindow = new EventEmitter<void>()

  constructor(private adminService: AdminService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.dataEditingForm = new FormGroup({
      newCompanyName: new FormControl(this.adminInformation.companyName, [
        Validators.required
      ])
    })
  }

  ngOnDestroy(): void {
    if (this.putAdminInformationSub) {
      this.putAdminInformationSub.unsubscribe()
    }
  }

  save() {
    this.changeUserData()
    this.putAdminInformationSub = this.adminService.putAdminCompanyName(this.adminInformation)
      .subscribe(() => {
        this.closePopupWindow.next()
        this.auth.userCompanyName = this.adminInformation.companyName
      })
  }

  changeUserData() {
    this.adminInformation.companyName = this.dataEditingForm.value.newCompanyName
  }

}
