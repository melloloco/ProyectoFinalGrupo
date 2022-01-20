import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeComponent } from './login-employe.component';

describe('LoginEmployeComponent', () => {
  let component: LoginEmployeComponent;
  let fixture: ComponentFixture<LoginEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEmployeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
