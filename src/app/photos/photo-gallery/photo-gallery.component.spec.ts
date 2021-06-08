import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PhotoGalleryComponent } from './photo-gallery.component';

describe('PhotoGalleryComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
            ],
            declarations: [
                PhotoGalleryComponent,
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(PhotoGalleryComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render 1 photo per photo input', async () => {
        const fixture = TestBed.createComponent(PhotoGalleryComponent);
        const app = fixture.componentInstance;
        app.photos = [
            { title: '', large: '', medium: '', small: '', original: '', description: '', tags: [] },
            { title: '', large: '', medium: '', small: '', original: '', description: '', tags: [] },
            { title: '', large: '', medium: '', small: '', original: '', description: '', tags: [] },
        ];

        fixture.detectChanges();
        await fixture.whenStable();

        const photoEls = fixture.nativeElement.querySelectorAll('picture');
        expect(photoEls?.length).toEqual(app.photos.length);
    });
});
