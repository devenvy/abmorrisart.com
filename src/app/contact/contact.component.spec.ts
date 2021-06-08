import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactComponent,
      ],
    }).compileComponents();
  });

  it('should create component instance', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();

    const titleEl = fixture.nativeElement.querySelector('.hero-title');

    expect(titleEl?.textContent?.trim()).toEqual('Don’t be shy.  Say Hello.');
  });

  it('should render working links', async () => {
    const fixture = TestBed.createComponent(ContactComponent);
    await fixture.whenStable();

    const socialLinkEls = fixture.nativeElement.querySelectorAll('.social-list a');

    expect(socialLinkEls.length).toEqual(10);
    socialLinkEls.forEach((x: HTMLAnchorElement) => expect(x.href).toBeTruthy());
  });
});
