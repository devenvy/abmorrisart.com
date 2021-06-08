import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QueryParamModule } from '@ngqp/core';
import { Observable, of } from 'rxjs';
import { Photo } from '../shared/photo-gallery/photo';
import { PortfolioComponent } from './portfolio.component';
import { PortfolioSearchParams, PortfolioService } from './portfolio.service';
import { MockProvider } from 'ng-mocks';

describe('PortfolioComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                RouterTestingModule.withRoutes([]),
                QueryParamModule,
            ],
            declarations: [
                PortfolioComponent,
            ],
            providers: [
                MockProvider(PortfolioService, {
                    get: () => of([]),
                    getTags: () => of([]),
                })
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
        expect(filterLabelEl?.textContent).toBe('Filter:')
    });

    it('should render all tags as options', async () => {
        const fixture = TestBed.createComponent(PortfolioComponent);
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement;
        const exampleLinkEls = compiled.querySelectorAll('#filter option');
        expect(exampleLinkEls?.length).toEqual(4);
    });

    it('should autoselect ', async () => {
        const fixture = TestBed.createComponent(PortfolioComponent);
        fixture.detectChanges();
        await fixture.whenStable();

        const router = TestBed.inject(Router);
        router.navigateByUrl('/?tag=Digital%20Portrait');
        fixture.detectChanges();
        await fixture.whenStable();

        const compiled = fixture.nativeElement;
        const filterEl = compiled.querySelector('#filter');
        const filterVal = filterEl?.value;

        const selectedOptEl = compiled.querySelectorAll(`#filter option[value='${filterVal}']`);

        expect(selectedOptEl).toBeTruthy();
    });
});
