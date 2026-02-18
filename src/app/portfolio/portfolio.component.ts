import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Photo } from '../photos/shared/photo.model';
import { PhotoSearchParams, PhotoService } from '../photos/shared/photo.service';

@Component({
    selector: 'abma-portfolio',
    templateUrl: 'portfolio.component.html',
    standalone: false
})

export class PortfolioComponent implements OnInit, OnDestroy {

    private routeQueryParamsSub?: Subscription;
    private readonly tagMap: Record<string, string[]> = {
        All: [],
        'Digital Portrait': ['#portrait', '#procreate'],
        'Painted Portrait': ['#portrait', '#painting'],
        'Live Event': ['#weddingpainting'],
        Watercolor: ['#watercolor'],
    };
    private readonly limit = 100000;
    private readonly offset = 0;

    selectedTag = 'All';
    tags$ = of(Object.keys(this.tagMap));
    photos$: Observable<Photo[]> = of([]);

    constructor(
        private portfolioService: PhotoService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.applyQueryParams(this.route.snapshot.queryParamMap);

        this.routeQueryParamsSub = this.route.queryParamMap.subscribe((queryParams) => {
            this.applyQueryParams(queryParams);
        });
    }

    onTagChanged(tag: string): void {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                tag: tag === 'All' ? null : tag,
            },
            queryParamsHandling: 'merge',
        });
    }

    ngOnDestroy(): void {
        this.routeQueryParamsSub?.unsubscribe();
    }

    private applyQueryParams(queryParams: ParamMap): void {
        const routeTag = queryParams.get('tag') ?? 'All';
        const selectedTag = this.tagMap[routeTag] ? routeTag : 'All';

        const searchParams: PhotoSearchParams = {
            limit: this.limit,
            offset: this.offset,
            tags: this.tagMap[selectedTag] ?? [],
        };

        setTimeout(() => {
            this.selectedTag = selectedTag;
            this.photos$ = this.portfolioService.get(searchParams);
        });
    }
}
