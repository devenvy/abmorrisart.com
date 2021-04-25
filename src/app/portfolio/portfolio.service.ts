import { Observable, of } from 'rxjs';
import { Photo } from '../shared/photo-gallery/photo';

export interface PortfolioSearchParams {
    limit: number;
    offset: number;
}

export abstract class PortfolioService {
    public abstract get(params: PortfolioSearchParams): Observable<Photo[]>;
}
