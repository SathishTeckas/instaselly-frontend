import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/controller/authentication/authentication.service';
import { HelperService } from 'src/app/shared/controller/common/helper/helper.service';
import { iAddress, iCustomerAddress } from 'src/app/shared/interface/customer/address.interface';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-print-address',
  templateUrl: './print-address.component.html',
  styleUrls: ['./print-address.component.scss']
})
export class PrintAddressComponent {

  public sellerAddress: Partial<iAddress> = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { address: iCustomerAddress, customerName: string },
    private auth: AuthenticationService,
    private helper: HelperService
  ) { 
    this.getAddress();
  }

  private async getAddress(): Promise<void> {
    this.sellerAddress = await lastValueFrom(this.auth.getUserAddress());
  }


  public print(): void {

    if (!this.sellerAddress) {
      this.helper.showToaster('Seller address not found. Please add address to print the page');
    }

    if (!this.data || !this.data.address || !this.data.address.shippingAddress) return;

    let address: iAddress = this.data.address.shippingAddress;

    const documentDefinition = {
      content: [
        {
          text: '\n\n',
          margin: [0, 20]
        },
        {
          columns: [
            {
              width: '*',
              text: 'From \n\n',
              style: 'header'
            },
            {
              width: '*',
              text: 'To \n\n',
              style: 'header'
            }
          ]
        },
        {
          columns: [
            {
              width: '*',
              text: `${ this.sellerAddress.fullName } \n\n ${ this.sellerAddress.addressLine1 }, \n ${ this.sellerAddress.addressLine2 }, \n ${ this.sellerAddress.city }, \n ${ this.sellerAddress.state } - ${ this.sellerAddress.pincode }  \n\n Ph - ${ this.sellerAddress.phoneNumber }`
            },
            {
              width: '*',
              text: `${ this.data.customerName } \n\n ${ address.addressLine1 }, \n ${ address.addressLine2 }, \n ${ address.city }, \n ${ address.state } - ${ address.pincode }  \n\n Ph - ${ address.phoneNumber }`
            }
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }
      }
    };

    pdfMake.createPdf(documentDefinition as any).open();
  }

}
