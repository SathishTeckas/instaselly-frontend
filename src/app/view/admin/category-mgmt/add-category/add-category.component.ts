import { Component, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { iCategory } from 'src/app/shared/interface/admin/category.interface';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  
  public categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl(''),
    params: new FormControl([])
  });
  
  public fields: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { category: iCategory }
  ) {
    if (data?.category) {
      this.fields = data.category.params;
      this.categoryForm.setValue({
        categoryName: data.category.categoryName,
        params: ''
      });
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    if (value) {
      this.fields.push(value);
    }

    event.chipInput.clear();
    this.categoryForm.setValue({ 
      ...this.categoryForm.value,
      params: '' 
    });
  }

  public remove(param: string): void {
    const index = this.fields.indexOf(param);

    if (index >= 0) {
      this.fields.splice(index, 1);
    }
  }

  public addCategory(id: string): void {
    document.getElementById(id)?.click();
    
    if (this.categoryForm.valid) {
      this.categoryForm.value['params'] = this.fields;
      this.dialogRef.close(this.categoryForm.value)
    }

  }

}
