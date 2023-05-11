import {Component, Input} from "@angular/core";
import {AbstractControl} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-validation-message',
  styleUrls: ['../../../login-page/login-page.component.css'],
  template: `
    <div class="validation-message-wrapper">
      <div *ngIf="control.invalid && control.touched">
        <div *ngIf="control.errors?.['required']">
          Обязательное поле
        </div>
        <div *ngIf="control.errors?.['email']">
          Введен некорректный email
        </div>
        <div *ngIf="control.errors?.['minlength']">
          Минимальная длина пароля
          {{control.errors?.['minlength'].requiredLength}}
          симвалов
        </div>
        <div *ngIf="control.errors?.['valueMatch']">
          Пароли не совпадают
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class ValidationMessageComponent {
  @Input()
  public control!: AbstractControl
}
