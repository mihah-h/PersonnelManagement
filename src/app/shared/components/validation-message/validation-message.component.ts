import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-validation-message',
  styleUrls: ['../../../login-page/login-page.component.css'],
  template: `
    <div>
      <div *ngIf="control.invalid && control.touched">
        <div class="valid-message" *ngIf="control.errors?.['required']">
          Обязательное поле
        </div>
        <div class="valid-message" *ngIf="control.errors?.['email']">
          Введен некорректный email
        </div>
        <div class="valid-message" *ngIf="control.errors?.['minlength']">
          Минимальная длина пароля
          {{control.errors?.['minlength'].requiredLength}}
          символов
        </div>
        <div class="valid-message" *ngIf="control.errors?.['valueMatch']">
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
