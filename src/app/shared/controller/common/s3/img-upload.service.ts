import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../crud/crud.service';
import { environment } from 'src/environment/environment';
import { S3Endpoints } from 'src/app/shared/endpoints/s3/s3.endpoint';
import { iProductImages } from 'src/app/shared/interface/common/product-image.interface';
import { iCommonResponse } from 'src/app/shared/interface/common/common-response.interface';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HelperService } from '../helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ImgUploadService {

  constructor(
    private injector: Injector,
    private authService: AuthenticationService,
    private helper: HelperService
  ) { }

  public uploadImages(images: iProductImages[]): Promise<string[]> {
    const urls: string[] = [];
  
    if (!images || images.length <= 0) {
      return Promise.resolve(urls);
    }
  
    const uploadPromises: Promise<void>[] = [];
  
    images.forEach((image: iProductImages) => {
      const errorMessage: string =
        'Something went wrong while uploading image ' +
        image.file.name +
        '. Please try again later or choose a different image';

        const imageName: string = new Date().getTime() + image.file.name;
  
      const uploadPromise = new Promise<void>((resolve) => {
        this.upload(image.file, imageName)
          .subscribe({
            next: (res: iCommonResponse) => {
              
              if (!res || !res.description) {
                this.helper.showToaster(errorMessage);
              }

              urls.push(imageName);
  
              resolve();
            },
            error: (err: Error) => {
              urls.push(imageName);
              this.helper.showToaster(errorMessage);
              resolve();
            },
          });
      });
  
      uploadPromises.push(uploadPromise);
    });
  
    return Promise.all(uploadPromises).then(() => urls);
  }
  

  private upload(file: File, name: string): Observable<iCommonResponse> {
    const crud = this.injector.get(CrudService);
    const userName: string = this.authService.getDecodedToken()?.userName ?? 'Mis';
    let formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('fileName', name);
    formData.append('folderName', userName);

    return crud.create(
      environment.s3Api,
      S3Endpoints.imageUpload,
      formData,
      true
    );
  }

}
