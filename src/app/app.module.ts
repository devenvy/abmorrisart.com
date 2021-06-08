import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PhotoService } from './photos/shared/photo.service';
import { HeaderComponent } from './core/header/header.component';
import { PhotoGalleryComponent } from './photos/photo-gallery/photo-gallery.component';
import { PhotoModalComponent } from './photos/photo-modal/photo-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesComponent } from './services/services.component';
import { LocalPhotoService } from './photos/shared/local-photo.service';
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
    LocalPhotoService,
    {
      provide: PhotoService,
      useClass: LocalPhotoService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
