import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminService} from "../shared/services/admin.service";
import {AdminInformation} from "../shared/interfaces/admin-interfaces/adminInformation";
import {Subscription} from "rxjs";
import {PopupWindowFirstComponent} from "../shared/components/popup-window-first/popup-window-first.component";
import {
  RefactorCompanyHistoryPopupWindowComponent
} from "../shared/components/refactor-company-history-popup-window/refactor-company-history-popup-window.component";
import {
  RefactorCompanyNamePopupWindowComponent
} from "../shared/components/refactor-compony-name-popup-window/refactor-company-name-popup-window.component";
import {
  RefactorAdminEmailPopupWindowComponent
} from "../shared/components/refactor-admin-email-popup-window/refactor-admin-email-popup-window.component";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit{

  adminInformation!: AdminInformation
  getAdminInformationSub!: Subscription
  closeRefactorCompanyNamePopupWindowComponentSub!: Subscription
  closeRefactorAdminEmailPopupWindowComponentSub!: Subscription

  @ViewChild('popupContainer', { read: ViewContainerRef })
  private popupContainer: ViewContainerRef

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdminInformationSub = this.adminService.getAdminInformation()
      .subscribe((adminInformation) => this.adminInformation = adminInformation)
  }

  showRefactorCompanyNamePopupWindow() {
    this.popupContainer.clear()
    const component = this.popupContainer.createComponent(RefactorCompanyNamePopupWindowComponent)
    component.instance.adminInformation = this.adminInformation
    this.closeRefactorCompanyNamePopupWindowComponentSub = component.instance.closePopupWindow
      .subscribe(() => this.popupContainer.clear())
  }

  showRefactorAdminEmailPopupWindow() {
    this.popupContainer.clear()
    const component = this.popupContainer.createComponent(RefactorAdminEmailPopupWindowComponent)
    component.instance.adminInformation = this.adminInformation
    this.closeRefactorAdminEmailPopupWindowComponentSub = component.instance.closePopupWindow
      .subscribe(() => this.popupContainer.clear())
  }

}
