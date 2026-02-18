import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { PortfolioComponent } from './portfolio.component';
import { PhotoService } from '../photos/shared/photo.service';

describe('PortfolioComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [],
            declarations: [
                PortfolioComponent,
            ],
            providers: [
                provideRouter([]),
                {
                    provide: PhotoService,
                    useValue: {
                        get: () => of([]),
                        getTags: () => of([]),
                    }
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(PortfolioComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render filter label', async () => {
        const fixture = TestBed.createComponent(PortfolioComponent);
        await fixture.whenStable();
        const compiled = fixture.nativeElement;
        const filterLabelEl = compiled.querySelector('label[for=filter]');
        expect(filterLabelEl?.textContent).toBe('Filter:');
    });

    it('should render all tags as options', async () => {
        const fixture = TestBed.createComponent(PortfolioComponent);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement;
        const exampleLinkEls = compiled.querySelectorAll('#filter option');
        expect(exampleLinkEls?.length).toEqual(5);
    });

    it('should autoselect ', async () => {
        const router = TestBed.inject(Router);
        await router.navigateByUrl('/?tag=Digital%20Portrait');

        const fixture = TestBed.createComponent(PortfolioComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const compiled = fixture.nativeElement;
        const filterEl = compiled.querySelector('#filter');
        const filterVal = filterEl?.value;

        const selectedOptEl = compiled.querySelectorAll(`#filter option[value='${filterVal}']`);

        expect(selectedOptEl).toBeTruthy();
    });
});
