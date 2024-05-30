import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toNumber } from 'ng-zorro-antd/core/util';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../login/login.component.scss']
})
export class ForgotPasswordComponent {

  public resetForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private helper: HelperService
  ) {}

  public hasError = (controlName: string, errorName: string) => {
    return this.resetForm.controls[controlName].hasError(errorName);
  }

  public verify(): void {
    if (!this.resetForm.valid) return;

    const verifier: string = this.resetForm.value['id'];
    
    let method: 'mobile' | 'email' = 'email';

    if (toNumber(verifier)) { 
      method = 'mobile'; 
    }

    this.helper.showToaster('OTP sent to ' + verifier);
    this.router.navigate(['/auth/verification'], { queryParams: { id: btoa(JSON.stringify({ verifier, method })) } });
  }

  public goto(): void {
    this.router.navigate(['/auth/login']);
  }
}
