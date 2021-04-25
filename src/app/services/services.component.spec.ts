import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { PortfolioSearchParams, PortfolioService } from '../portfolio/portfolio.service';
import { Photo } from '../shared/photo-gallery/photo';
import { PhotoGalleryComponent } from '../shared/photo-gallery/photo-gallery.component';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ServicesComponent,
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const titleEls = compiled.querySelectorAll('.service-title');
    expect(titleEls?.length).toEqual(4);
    expect(titleEls[0]?.textContent).toContain('Digital Portrait');
  });
});
