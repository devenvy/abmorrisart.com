import { Observable, of } from 'rxjs';
import { Photo } from './photo.model';

export interface PhotoSearchParams {
    limit: number;
    offset: number;
    tags?: string[];
}

export abstract class PhotoService {
    public abstract get(params: PhotoSearchParams): Observable<Photo[]>;

    public abstract getTags(): Observable<string[]>;
}
