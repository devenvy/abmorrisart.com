import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../shared/photo-gallery/photo';
import { PortfolioSearchParams, PortfolioService } from './portfolio.service';
import * as photosData from './photos.json';


@Injectable({providedIn: 'root'})
export class LocalPortfolioService extends PortfolioService {

    private getAll(): Photo[] {
        return (photosData as any).default;
    }

    public get(params: PortfolioSearchParams): Observable<Photo[]> {
        const photos = this.getAll().slice(params.offset, params.offset + params.limit);
        return of(photos);
    }
}
