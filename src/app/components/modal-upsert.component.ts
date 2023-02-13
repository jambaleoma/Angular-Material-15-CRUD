import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-upsert',
  template: `
    <h2 mat-dialog-title>Install Angular</h2>
    <mat-dialog-content class="mat-typography">

      <form (ngSubmit)="saveHandler()" [formGroup]="form" >
        <mat-form-field class="example-form-field">
          <mat-label>Username</mat-label>
          <input matInput type="text" formControlName="name">
        </mat-form-field>
        <mat-form-field class="example-form-field">
          <mat-label>Email</mat-label>
          <input matInput type="text" formControlName="email">
        </mat-form-field>
        
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>Cancel</button>
          <button mat-button (click)="saveHandler()" cdkFocusInitial>Confirm</button>
        </mat-dialog-actions>
        {{form.value | json}}

      </form>
    </mat-dialog-content>
  `,
})
export class ModalUpsertComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {
    // Populate the form with received data
    this.form.patchValue(user);
  }

  saveHandler(): void {
    // close the modal passing the updated form value
    this.matDialog.close(this.form.value);
  }
}
