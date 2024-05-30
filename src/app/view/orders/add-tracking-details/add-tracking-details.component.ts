import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { OrderService } from 'src/app/shared/controller/order/order.service';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';

@Component({
  selector: 'app-add-tracking-details',
  templateUrl: './add-tracking-details.component.html',
  styleUrls: ['./add-tracking-details.component.scss']
})
export class AddTrackingDetailsComponent {


  public trackingDetailForm: FormGroup = new FormGroup({
    trackingId: new FormControl('', [Validators.required]),
    trackingUrl: new FormControl('', [Validators.required])
  });

  constructor(
    private dialogRef: MatDialogRef<AddTrackingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private os: OrderService,
    private helper: HelperService
  ) {}

  public hasError = (controlName: string, errorName: string) => {
    return this.trackingDetailForm.controls[controlName].hasError(errorName);
  }


  public save(): void {
    if (!this.trackingDetailForm.valid) return;
    this.os.updateOrder(this.data.id, {  
      trackingId: this.trackingDetailForm.value['trackingId'],
      trackingUrl: this.trackingDetailForm.value['trackingUrl']
    }).subscribe({
      next: (res: iCommonResponse) => {
        
        if (!res || !res.description) {
          this.helper.showToaster(res.status ?? 'Something went wrong. Please tryagain later', 'error');
          this.dialogRef.close();
          return;
        }

        this.helper.showToaster('Tracking details added successfully', 'success');
        this.dialogRef.close();
      },
      error: (err: any) => {
        this.helper.showToaster(err?.error?.description ?? 'Something went wrong. Please tryagain later', 'error');
      }
    })
  }

}
