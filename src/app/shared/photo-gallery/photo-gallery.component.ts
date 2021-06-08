import { Component, Input, OnInit } from '@angular/core';
import { Photo } from './photo';

@Component({
    selector: 'abma-photo-gallery',
    templateUrl: 'photo-gallery.component.html',
    styleUrls: ['photo-gallery.component.scss']
})

export class PhotoGalleryComponent {
    @Input() photos: Photo[] = [];

    selectedPhoto?: Photo;

    constructor() { }

    onPhotoSelected(photo: Photo): void {
        this.selectedPhoto = photo;
    }

    onModalClosed(): void {
        this.selectedPhoto = undefined;
    }
}
