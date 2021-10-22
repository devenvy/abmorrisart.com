import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Photo } from '../shared/photo.model';

@Component({
    selector: 'abma-multiphoto-modal',
    templateUrl: 'multi-photo-modal.component.html',
    styleUrls: ['multi-photo-modal.component.scss']
})

export class MultiPhotoModalComponent {

    @Input() photos?: Photo[];

    @Input() activePhoto?: Photo;

    @Output() modalClosed = new EventEmitter<void>();

    constructor() { }

    next(): void {
        if (this.activePhoto === undefined || this.photos === undefined) {
            return;
        }

        let idx = this.photos?.indexOf(this.activePhoto) + 1;

        if (idx >= this.photos.length) {
            idx = 0;
        }

        this.activePhoto = this.photos[idx];
    }

    back(): void {
        if (this.activePhoto === undefined || this.photos === undefined) {
            return;
        }

        let idx = this.photos?.indexOf(this.activePhoto) - 1;

        if (idx < 0) {
            idx = this.photos.length - 1;
        }

        this.activePhoto = this.photos[idx];
    }
}
