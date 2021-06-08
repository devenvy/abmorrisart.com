import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../photos/shared/photo.model';
import { map } from 'rxjs/operators';
import { PhotoService } from '../photos/shared/photo.service';

@Component({
    selector: 'abma-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    photos$: Observable<Photo[]> = of([]);

    constructor(private portfolioService: PhotoService) { }

    ngOnInit(): void {
        this.photos$ = this.portfolioService.get({ limit: 6, offset: 0});
    }
}
