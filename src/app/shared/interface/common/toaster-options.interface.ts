import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

export interface iToasterOptions {
    time?: number;
    horizontalPostion?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition; 
    closeIcon?: boolean;
}

export interface iToasterData {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    closeIcon: boolean;
}