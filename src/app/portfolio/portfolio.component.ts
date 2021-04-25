import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Photo } from '../shared/photo-gallery/photo';
import { ScrollService } from '../shared/scrolling/scroll.service';
import { InstagramPortfolioService } from './instagram-portfolio.service';
import { PortfolioService } from './portfolio.service';

@Component({
    selector: 'abma-portfolio',
    templateUrl: 'portfolio.component.html'
})

export class PortfolioComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject();

    constructor(private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this.portfolioService.get({
            limit: 1000,
            offset: 0,
        })
        .subscribe(
            results => {
                console.log(results);
            },
            err => {
                console.error(err);
            }
        );
    }

    ngOnDestroy(): void {
        // Remove event handlers
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
