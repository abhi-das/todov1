import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ], 
      declarations: [
        LoginComponent
      ],
      providers: [ LoginService ]
    })

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

  });

  it('should create LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
      expect(component.loginForm.valid).toBeFalsy();
  });

  it('userid should not be empty', () => {
    let userIdEle = component.loginForm.controls['userid'];
    expect(userIdEle.valid).toBeFalsy();
  })

  it('password should not be empty', () => {
    let passwordEle = component.loginForm.controls['password'];
    expect(passwordEle.valid).toBeFalsy();
  })

  it('Submit a form data and match the user filled values ', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['userid'].setValue('abc');
    component.loginForm.controls['password'].setValue('password123');

    let formData = component.loginForm.value;
    component.onAuth();

    expect(formData['userid']).toBe('abc');
    expect(formData['password']).toBe('password123');

  })

  // Add one more case for redirect after form submit

});
