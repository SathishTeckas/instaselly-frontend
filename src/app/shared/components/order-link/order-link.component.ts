import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { HelperService } from '../../controller/common/helper/helper.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-order-link',
  templateUrl: './order-link.component.html',
  styleUrls: ['./order-link.component.scss']
})
export class OrderLinkComponent implements AfterViewInit {

  public baseUrl: string = '';

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<OrderLinkComponent>,
    private clipboard: Clipboard,
    private helper: HelperService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.baseUrl = this.document.location.origin + '/customer/checkout';
  }

  public ngAfterViewInit(): void {
    if (this.data && this.data.id) {
      this.baseUrl = this.baseUrl + '?id=' + this.data.id;
    }
  }

  public close(): void {
    this.dialogRef.close();
    this.router.navigate(['stock']);
  }

  public copy(link: string): void {
    this.clipboard.copy(link);
    this.helper.showToaster('Link copied to clipboard', 'success');
  }
}
