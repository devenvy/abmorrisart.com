import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Photo } from '../shared/photo-gallery/photo';
import { PortfolioSearchParams, PortfolioService } from './portfolio.service';
import * as photosData from './photos.json';
import { map, shareReplay, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class LocalPortfolioService extends PortfolioService {

    private tags = new BehaviorSubject<Photo[]>([]);
    private tags$ = this.tags.pipe(
        tap(_ => console.log('executed')),
        map(photos => {
            const tags: { [key: string]: string } = {};
            photos.forEach(photo => {
                photo.tags?.forEach(tag => {
                    if (!tags[tag]) {
                        tags[tag] = tag;
                    }
                });
            });

            return Object.keys(tags).sort();
        }),
        shareReplay(1)
    );

    constructor() {
        super();
        this.tags.next(this.getAll());
    }

    private getAll(): Photo[] {
        return (photosData as any).default;
    }

    public get(params: PortfolioSearchParams): Observable<Photo[]> {
        console.log(params);
        let photos = this.getAll().slice(params.offset, params.offset + params.limit);

        if (params.tags) {
            photos = photos.filter(photo => {
                const photoTags = params?.tags ?? [];
                for (const tag of photoTags) {
                    if ((photo.tags ?? []).indexOf(tag) < 0) {
                        return false;
                    }
                }

                return true;
            });
        }

        return of(photos);
    }

    getTags(): Observable<string[]> {
        return this.tags$;
    }
}
