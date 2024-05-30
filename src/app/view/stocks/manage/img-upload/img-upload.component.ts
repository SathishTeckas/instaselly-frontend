import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxCroppedEvent } from 'ngx-photo-editor';
import { iProductImages } from 'src/app/shared/interface/common/product-image.interface';

@Component({
  selector: 'img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss']
})
export class ImgUploadComponent implements OnChanges {

  @Input() availableImage: iProductImages[] = [];
  @Output() onImageChange: EventEmitter<iProductImages[]> = new EventEmitter<iProductImages[]>();
  
  public uploadedImages: iProductImages[] = [];
  public isUpload: string = '0';

  public owlOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    // navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1200: {
        items: 6
      }
    },
    autoWidth: false,
    margin: 5,
    nav: false
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['availableImage'] && changes['availableImage'].currentValue) {
      this.uploadedImages.push(...this.availableImage);
    }
  }

  public onFileChange(event: NgxCroppedEvent): void {
    
    this.uploadedImages.push({
      thumb: event.base64 ? event.base64: '',
      file: event.file ? event.file: new File([], 'error'),
      isPrimary: this.uploadedImages.length <= 0 ? true: false
    });

    this.isUpload = this.isUpload === '0' ? '1': '0';

    this.onImageChange.emit(this.uploadedImages);
  }

  public markAsPrimary(index: number): void {
    this.uploadedImages.forEach((product: iProductImages) => product.isPrimary = false);
    this.uploadedImages[index].isPrimary = true;
    this.onImageChange.emit(this.uploadedImages);
  }

  public onDelete(index: number): void {
    this.uploadedImages.splice(index, 1);
    this.onImageChange.emit(this.uploadedImages);
  }
}

