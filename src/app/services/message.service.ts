import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, action: string = 'Close', duration: number = 2000): void {
    this.snackBar.open(message, action, {
      duration: duration
    });
  }
}