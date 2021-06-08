import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { PhotoSearchParams, PhotoService } from '../photos/shared/photo.service';
import { Photo } from '../photos/shared/photo.model';
import { PhotoGalleryComponent } from '../photos/photo-gallery/photo-gallery.component';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('should render title', async () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement;
    const titleEls = compiled.querySelectorAll('.service-title');
    expect(titleEls?.length).toEqual(4);
    expect(titleEls[0]?.textContent).toContain('Digital Portrait');
  });

  it('should render example links', async () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    await fixture.whenStable();

    const compiled = fixture.nativeElement;
    const exampleLinkEls = compiled.querySelectorAll('.example-link');
    expect(exampleLinkEls?.length).toEqual(2);
  });
});
