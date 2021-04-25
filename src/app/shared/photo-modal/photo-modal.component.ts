import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../photo-gallery/photo';

@Component({
    selector: 'abma-modal',
    templateUrl: 'photo-modal.component.html',
    styleUrls: ['photo-modal.component.scss']
})

export class PhotoModalComponent implements AfterViewInit {

    @Input() photo?: Photo;

    @Output() modalClosed = new EventEmitter<void>();

    constructor() { }

    ngAfterViewInit(): void {
        console.log(this.photo);
    }
}
