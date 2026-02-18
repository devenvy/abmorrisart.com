import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../shared/photo.model';

@Component({
    selector: 'abma-modal',
    templateUrl: 'photo-modal.component.html',
    styleUrls: ['photo-modal.component.scss'],
    standalone: false
})

export class PhotoModalComponent {

    @Input() photo?: Photo;

    @Output() modalClosed = new EventEmitter<void>();

    constructor() { }
}
