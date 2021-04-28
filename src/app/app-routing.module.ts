import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: 'portfolio', pathMatch: 'prefix', component: PortfolioComponent },
  { path: 'contact', pathMatch: 'prefix', component: ContactComponent },
  { path: 'services', pathMatch: 'prefix', component: ServicesComponent },

  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
