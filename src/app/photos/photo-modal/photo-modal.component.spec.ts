import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { PhotoModalComponent } from './photo-modal.component';

describe('PhotoModalComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
            ],
            declarations: [
                PhotoModalComponent,
            ],
            providers: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(PhotoModalComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should create display set photo', async () => {
        const fixture = TestBed.createComponent(PhotoModalComponent);
        fixture.componentInstance.photo = {
            title: '',
            large: '',
            medium: '',
            small: '',
            original: '',
            description: '',
            tags: []
        };

        fixture.detectChanges();
        await fixture.whenStable();

        const imgEl = fixture.nativeElement.querySelector('img');
        expect(imgEl).toBeTruthy();
    });

    it('should emit closed on click click', async () => {
        const fixture = TestBed.createComponent(PhotoModalComponent);
        await fixture.whenStable();

        const closeBtnEl = fixture.nativeElement.querySelector('.close');
        const closedEmitPromise = firstValueFrom(fixture.componentInstance.modalClosed);

        closeBtnEl.click();

        await closedEmitPromise;
        expect(1).toBe(1); // just check we made it this far
    });
});
