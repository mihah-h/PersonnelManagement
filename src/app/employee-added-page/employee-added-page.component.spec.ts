import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddedPageComponent } from './employee-added-page.component';

describe('EmployeeAddedPageComponent', () => {
  let component: EmployeeAddedPageComponent;
  let fixture: ComponentFixture<EmployeeAddedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAddedPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeAddedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
