import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import { iToasterData } from '../../interface/common/toaster-options.interface';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  
  constructor(
    public snackBarRef: MatSnackBarRef<ToasterComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: iToasterData
  ) { }

}
