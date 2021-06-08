import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [
                HeaderComponent,
            ],
        }).compileComponents();
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(HeaderComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render logo', async () => {
        const fixture = TestBed.createComponent(HeaderComponent);
        await fixture.whenStable();

        const logoEl = fixture.nativeElement.querySelector('img.logo');
        expect(logoEl).toBeTruthy();
    });
});
