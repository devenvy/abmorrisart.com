import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

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
import { MultiPhotoModalComponent } from './photos/multi-photo-modal/multi-photo-modal.component';

import * as Hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any;
}

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
    PortfolioComponent,
    MultiPhotoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QueryParamModule,
    HammerModule
  ],
  providers: [
    LocalPhotoService,
    {
      provide: PhotoService,
      useClass: LocalPhotoService
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
