import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { PhotoSearchParams, PhotoService } from '../photos/shared/photo.service';
import { Photo } from '../photos/shared/photo.model';
import { PhotoGalleryComponent } from '../photos/photo-gallery/photo-gallery.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        HomeComponent,
        PhotoGalleryComponent,
      ],
      providers: [
        MockProvider(PhotoService, {
          get: () => of([]),
          getTags: () => of([]),
        })
      ]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.hero-title').textContent).toContain('Amber Morris');
  });
});
