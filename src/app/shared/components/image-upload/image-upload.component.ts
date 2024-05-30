import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { image } from './sample';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnChanges {

  public error: string = '';

  @Input() previewImage: string = image;
  @Input() isPrimary: boolean = false;

  @Output() onImageChange: EventEmitter<NgxCroppedEvent> = new EventEmitter<NgxCroppedEvent>();
  @Output() onImageDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() mark: EventEmitter<void> = new EventEmitter<void>();

  constructor(private service: NgxPhotoEditorService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['previewImage'] && (changes['previewImage'].currentValue === '0' || changes['previewImage'].currentValue === '1')) {
      this.previewImage = '';
    }
  }

  /**
   * Triggers when the file changes happens
   * @param $event file event
  */
  public onFileInput($event: any): void {
    
    const file: File = $event['target']['files'][0];

    if (!file) return;

    if (!file.type.includes('image')) {
      this.error = 'Unsupported media type';
      return;
    }

    if (file.size >=  5000000) {
      this.error = 'Large file size';
      return;
    }

    this.error = '';

    this.service.open($event, {
      aspectRatio: 4 / 5,
      autoCropArea: 1,
      modalTitle: 'Preview'
    }).subscribe({
      next: (value: NgxCroppedEvent) => {
        if (!value?.base64) return;
        this.previewImage = value.base64;
        this.onImageChange.emit(value);
        this.error = '';
      },
      error: () => {
        this.error = 'Unsupported media type';
      }
    });
  }

  /**
   * Triggers when the delete button clicked
  */
  public onDelete(): void {
    this.previewImage = '';
    this.onImageDelete.emit();
  }

  /**
   * Trigger a event when user clicks
  */
  public markAsPrimary(): void {
    this.mark.emit();
  }
}
