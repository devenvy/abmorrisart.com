import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../shared/photo-gallery/photo';
import { map } from 'rxjs/operators';
import { PortfolioService } from '../portfolio/portfolio.service';

@Component({
    selector: 'abma-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

    photos$: Observable<Photo[]> = of([]);

    constructor(private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this.photos$ = this.portfolioService.get({ limit: 6, offset: 0});
    }
}
