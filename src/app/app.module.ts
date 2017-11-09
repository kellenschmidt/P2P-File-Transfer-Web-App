import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PeerService } from './shared/api/peer.service';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [PeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
