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
        console.log(photo)
        this.selectedPhoto = photo;
    }

    onModalClosed(): void {
        console.log('modal closed')
        this.selectedPhoto = undefined;
    }
}
