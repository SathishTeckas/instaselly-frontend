import { Injectable } from '@angular/core';
import { CrudService } from '../common/crud/crud.service';
import { iProduct, iProductInformation } from '../../interface/product/product.interface';
import { iCommonResponse } from '../../interface/common/common-response.interface';
import { Observable, lastValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ProductEndpoint } from '../../endpoints/product/product.endpoint';
import { iProductImages } from '../../interface/common/product-image.interface';
import { iCreateStock, iStockDetails, iStockResponse } from '../../interface/stock/stock.interface';
import { ImgUploadService } from '../common/s3/img-upload.service';
import { iStockFilters } from '../../interface/stock/stock.filter.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private crudService: CrudService,
    private s3: ImgUploadService
  ) { }

  public saveProduct(
    prodctDetails: any,
    productInformation: iStockDetails[],
    images: iProductImages[],
    availableImages: iProductImages[] = [],
    id: string | undefined = undefined
  ): Observable<iCommonResponse> {

    const imageToUpload: iProductImages[] = images;
    const imageName: string[] = [];

    if (availableImages.length > 0) {
      availableImages.forEach((image: iProductImages) => {
        const index: number = imageToUpload.findIndex(img => img.thumb === image.thumb);
        
        if (index !== -1) {
          imageToUpload.splice(index, 1);
        } 

        let fileName: string = extractFilename(image.thumb) ?? 'NA';
        imageName.push(fileName);
      });
    }

    console.log(imageToUpload, availableImages);

     

    return new Observable<iCommonResponse>((observer) => {
      const saveProductAsync = async () => {
        imageName.push(...(await this.s3.uploadImages(imageToUpload)));
        let stock: iCreateStock = {
          categoryId: prodctDetails['categoryId'],
          name: prodctDetails['name'],
          images: imageName,
          shareToInsta: prodctDetails['shareToInsta'],
          instagramCaption: undefined,
          scheduleTime: undefined,
          variants: id ? []: productInformation,
          productId: id
        };
  
        let response: iCommonResponse;
        if (id) {
          await Promise.all(productInformation.map(async (variants: iStockDetails) => {
            response = await lastValueFrom(this.updateVariants(variants));
          }));
          response = await lastValueFrom(this.updateProduct(stock, id));
        } else {
          response = await lastValueFrom(this.addProduct(stock));
        }
  
        observer.next(response);
        observer.complete();
      };
  
      saveProductAsync().catch((error) => {
        observer.error(error);
      });
    });
  }

  public addProduct(product: iCreateStock): Observable<iCommonResponse> {
    return this.crudService.create(
      environment.api, 
      ProductEndpoint.index,
      product,
      true
    );
  }

  public getProducts(pageNumber: number = 0, pageSize: number = 10, filter: iStockFilters | undefined = undefined): Observable<iStockResponse> {

    let filterString: string = '';

    if (filter) {

      if (filter.showOnlyFavorites) {
        filterString += '&productSort=' + 'Favourite';
      } else {
        filterString += filter.sortby ? ('&productSort=' + filter.sortby) : '';
      }
      
      filterString += filter.searchKey ? ('&query=' + filter.searchKey) : '';
      filterString += filter.status ? ('&status=' + filter.status) : '';
      
    }

    return this.crudService.read(
      environment.api, 
      ProductEndpoint.index + '?fetchAll=' + (filterString ? false: true) + '&pageNumber=' + pageNumber + '&pageSize=' + pageSize + filterString,
      true
    );
  }

  public getProductById(id: string): Observable<iStockResponse> {
    return this.crudService.read(
      environment.api, 
      ProductEndpoint.index + '?productId=' + id,
      true
    );
  }

  public updateProduct(product: iCreateStock, id: string): Observable<iCommonResponse> {
    return this.crudService.update(
      environment.api, 
      ProductEndpoint.index + '/' + id,
      product,
      true
    );
  }

  public markAsFavorite(id: string, favorite: boolean): Observable<iCommonResponse> {
    return this.crudService.update(
      environment.api, 
      ProductEndpoint.favorite + id + '?isFavourite=' + favorite,
      undefined,
      true
    );
  }

  public updateVariants(variants: iStockDetails): Observable<iCommonResponse> {
    return this.crudService.update(
      environment.api, 
      ProductEndpoint.variants,
      variants,
      true
    );
  }

  public deleteProduct(ids: string[]): Observable<iCommonResponse> {
    return this.crudService.delete(
      environment.api, 
      ProductEndpoint.index,
      { productIdList: ids },
      true
    );
  }

}

function extractFilename(url: string): string | null {
  const regex = /\/([^\/?#]+)(?:[?#]|$)/;
  const match = url.match(regex);

  if (match) {
    return match[1];
  }

  return null;
}
