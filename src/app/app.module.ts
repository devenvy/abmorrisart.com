import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioService } from './portfolio/portfolio.service';
import { HeaderComponent } from './shared/header/header.component';
import { PhotoGalleryComponent } from './shared/photo-gallery/photo-gallery.component';
import { PhotoModalComponent } from './shared/photo-modal/photo-modal.component';
import { ScrollService } from './shared/scrolling/scroll.service';
import { HttpClientModule } from '@angular/common/http';
import { InstagramPortfolioService } from './portfolio/instagram-portfolio.service';
import { ServicesComponent } from './services/services.component';
import { LocalPortfolioService } from './portfolio/local-portfolio.service';
import { QueryParamModule } from '@ngqp/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    ContactComponent,
    ServicesComponent,

    /* shared */
    HeaderComponent,
    PhotoGalleryComponent,
    PhotoModalComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QueryParamModule
  ],
  providers: [
    ScrollService,
    LocalPortfolioService,
    {
      provide: PortfolioService,
      useClass: LocalPortfolioService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
