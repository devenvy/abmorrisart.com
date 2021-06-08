import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Observable, of } from 'rxjs';
import { PortfolioSearchParams, PortfolioService } from '../portfolio/portfolio.service';
import { Photo } from '../shared/photo-gallery/photo';
import { PhotoGalleryComponent } from '../shared/photo-gallery/photo-gallery.component';
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
        MockProvider(PortfolioService, {
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
