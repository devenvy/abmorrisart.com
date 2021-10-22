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

    onSwipe(evt: any) {
        console.log(evt);
        
        // up/down
        if (evt.delatY >= evt.deltaX) {
            const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

            if (y === '') {
                return;
            }

            if (y === 'up') {
                this.back();
                return;
            }

            if (y === 'down') {
                this.next();
                return;
            }
        }

        const x = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'left' : 'right') : '';

        if (x === '') {
            return;
        }

        if (x === 'left') {
            this.back();
            return;
        }

        if (x === 'right') {
            this.next();
            return;
        }


    }

    next() {
        if (this.activePhoto === undefined || this.photos === undefined) {
            return;
        }

        let idx = this.photos?.indexOf(this.activePhoto) + 1;

        if (idx >= this.photos.length) {
            idx = 0;
        }

        this.activePhoto = this.photos[idx];
    }

    back() {
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
