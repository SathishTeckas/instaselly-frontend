import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/controller/authentication/authentication.service';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { iLoginResponse } from 'src/app/shared/interface/authentication/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  public hidePassword: boolean = true;

  constructor(
    private authentication: AuthenticationService,
    private helper: HelperService,
    private router: Router
  ) {}

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public login(): void {
    this.router.navigate(['']);
  }

  public goto(): void {
    this.router.navigate(['auth/forgot']);
  }
}
