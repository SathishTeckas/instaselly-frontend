import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { iToasterOptions } from "../../interface/common/toaster-options.interface";

export class DefaultToasterOptions implements iToasterOptions {
    constructor(
        public time?: number,
        public horizontalPostion?: MatSnackBarHorizontalPosition,
        public verticalPosition?: MatSnackBarVerticalPosition,
        public closeIcon?: boolean
    ) {
        this.time = time ?? 2;
        this.horizontalPostion = horizontalPostion ?? 'center';
        this.verticalPosition = verticalPosition ?? 'top';
        this.closeIcon = closeIcon ?? false
    }
}