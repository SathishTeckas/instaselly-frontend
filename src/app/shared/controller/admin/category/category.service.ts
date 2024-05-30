import { Injectable } from '@angular/core';
import { CrudService } from '../../common/crud/crud.service';
import { iCategory } from 'src/app/shared/interface/admin/category.interface';
import { Observable } from 'rxjs';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { environment } from 'src/environment/environment';
import { CategoryEndpoints } from 'src/app/shared/endpoints/admin/category.endpoint';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private crudService: CrudService) { }

  public addCategory(categories: iCategory): Observable<iCommonResponse> {
    return this.crudService.create(
      environment.api, 
      CategoryEndpoints.index,
      categories,
      true
    );
  }

  public getCategories(): Observable<iCategory[]> {
    return this.crudService.read(
      environment.api, 
      CategoryEndpoints.index,
      true
    );
  }

  public getCategoryById(id: string): Observable<iCategory[]> {
    return this.crudService.read(
      environment.api, 
      CategoryEndpoints.index + '?categoryId=' + id,
      true
    );
  }

  public updateCategory(category: iCategory): Observable<iCommonResponse> {
    return this.crudService.update(
      environment.api, 
      CategoryEndpoints.index,
      category,
      true
    );
  }

  public deleteCategory(category: iCategory): Observable<iCommonResponse> {
    return this.crudService.delete(
      environment.api, 
      CategoryEndpoints.index + '?categoryId=' + category.categoryId,
      category,
      true
    );
  }
}
