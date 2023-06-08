import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AdminInformation} from "../../interfaces/admin-interfaces/adminInformation";
import {AdminService} from "../../services/admin.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-refactor-admin-email-popup-window',
  templateUrl: './refactor-admin-email-popup-window.component.html',
  styleUrls: ['./refactor-admin-email-popup-window.component.css']
})
export class RefactorAdminEmailPopupWindowComponent implements OnInit, OnDestroy{

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
      newAdminEmail: new FormControl(this.adminInformation.email, [
        Validators.required,
        Validators.email
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
    this.putAdminInformationSub = this.adminService.putAdminEmail(this.adminInformation)
      .subscribe(() => {
        this.closePopupWindow.next()
        this.auth.userEmail = this.adminInformation.email
      })
  }

  changeUserData() {
    this.adminInformation.email = this.dataEditingForm.value.newAdminEmail
  }

}
