import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueryParamBuilder, QueryParamGroup } from '@ngqp/core';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../shared/photo-gallery/photo';
import { PortfolioSearchParams, PortfolioService } from './portfolio.service';

@Component({
    selector: 'abma-portfolio',
    templateUrl: 'portfolio.component.html'
})

export class PortfolioComponent implements OnInit, OnDestroy {

    private searchParamsGroupSub?: Subscription;
    private tagMap = {
        All: [],
        'Digital Portrait': ['#portrait', '#procreate'],
        'Painted Portrait': ['#portrait', '#painting'],
        Watercolor: ['#watercolor'],
    };

    searchParamsGroup: QueryParamGroup;
    tags$ = of(Object.keys(this.tagMap));
    photos$?: Observable<Photo[]>;

    constructor(private portfolioService: PortfolioService, qpb: QueryParamBuilder) {
        this.searchParamsGroup = qpb.group({
            limit: qpb.numberParam('limit', { emptyOn: 100000 }),
            offset: qpb.numberParam('offset', { emptyOn: 0 }),
            tag: qpb.stringParam('tag', { emptyOn: 'All' }),
        });
    }

    ngOnInit(): void {

        this.searchParamsGroupSub = this.searchParamsGroup.valueChanges
            .pipe(map(searchParams => {
                const modified = {
                    limit: searchParams.limit,
                    offset: searchParams.offset,
                    tags: searchParams.tag ? (this.tagMap as any)[searchParams.tag] : [],
                };

                return modified;
            }))
            .subscribe(searchParams => {
                this.photos$ = this.portfolioService.get(searchParams as PortfolioSearchParams);
            });
    }

    ngOnDestroy(): void {
        this.searchParamsGroupSub?.unsubscribe();
    }
}
