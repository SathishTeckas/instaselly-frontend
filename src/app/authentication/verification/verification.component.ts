import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss', '../login/login.component.scss']
})
export class VerificationComponent {

  public method: string = 'email';
  public id: string = '';

  public otpForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private helper: HelperService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe({
      next: (param: Params) => {
        
        if (!param || !param['id']) {
          this.helper.showToaster('Invalid details. Please enter valid email or mobile number', 'error');
          this.goto();
        } else {
          const details: any = JSON.parse(atob(param['id']));
          this.id = details['verifier'];
          this.method = details['method'];
        } 

      }
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.otpForm.controls[controlName].hasError(errorName);
  }

  public verify(): void {
    if (!this.otpForm.valid) return;
    // this.router.navigate(['/auth/verification']);
  }
  
  public goto(): void {
    this.router.navigate(['/auth/login']);
  }
  
}
