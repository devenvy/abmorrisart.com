import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
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
    expect(exampleLinkEls?.length).toEqual(3);
  });
});
