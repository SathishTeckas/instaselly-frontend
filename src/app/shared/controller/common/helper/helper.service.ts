import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from 'src/app/shared/components/toaster/toaster.component';
import { DefaultToasterOptions } from 'src/app/shared/configurations/toaster/default-options.conf';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * To show the toaster
   * @param message display message; Ex. Success
   * @param type type of the toaster; 'success' | 'error' | 'warning' | 'info', Default info
  */
  public showToaster(
    message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', options: DefaultToasterOptions = new DefaultToasterOptions()): void {
    this._snackBar.openFromComponent(ToasterComponent, {
      duration: options.time ? (options.time * 1000): 2000,
      data: {
        message,
        type,
        closeIcon: options?.closeIcon
      },
      horizontalPosition: options?.horizontalPostion,
      verticalPosition: options?.verticalPosition,
      panelClass: ['toaster-' + type],
      politeness: 'assertive'
    });

  }

}
