import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { iCategory } from 'src/app/shared/interface/admin/category.interface';
import { CategoryService } from 'src/app/shared/controller/admin/category/category.service';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';

@Component({
  selector: 'app-category-mgmt',
  templateUrl: './category-mgmt.component.html',
  styleUrls: ['./category-mgmt.component.scss']
})
export class CategoryMgmtComponent implements OnInit {

  public categories: iCategory[] = [];

  constructor(
    private dialog: MatDialog,
    private cs: CategoryService
  ) {}

  public ngOnInit(): void {
    this.getCategories();
  }

  public openCategory(): void {
    this.dialog.open(AddCategoryComponent, {
      width: '500px'
    }).afterClosed().subscribe({
      next: (res: iCategory | null) => {
        if (!res) return;
        this.addCategory(res);
      }
    })
  }

  private addCategory(category: iCategory): void {
    this.cs.addCategory(category).subscribe({
      next: (res: iCommonResponse) => {
        if (!res) return;
        this.getCategories();
      }
    })
  }

  private getCategories(): void {
    this.cs.getCategories().subscribe({
      next: (res: iCategory[]) => {
        if (!res) return;
        this.categories = res;
      }
    });
  }

  public updateCategory(category: iCategory): void {
    this.dialog.open(AddCategoryComponent, {
      width: '500px',
      data: {
        category
      }
    }).afterClosed().subscribe(
      {
        next: (details: iCategory | null) => {
          if (!details) return;
          details['categoryId'] = category.categoryId;
          this.cs.updateCategory(details).subscribe({
            next: (res: iCommonResponse) => {
              if (!res) return;
              this.getCategories();
            }
          })
        }
      }
    );
  }

  public deleteCategory(category: iCategory): void {
    this.cs.deleteCategory(category).subscribe({
      next: (res: iCommonResponse) => {
        if (!res) return;
        this.getCategories();
      }
    })
  }

  public stopPropagation(event: any) {
    event.stopPropagation();
  }
}
