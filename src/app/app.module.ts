import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule, MatStepperModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TransferApprovalComponent } from './views/transfer-approval/transfer-approval.component';
import { FileTransferStepperComponent } from './views/file-transfer-stepper/file-transfer-stepper.component';
import { FileDownloadComponent } from './views/file-download/file-download.component';
import { TransferCancelledComponent } from './views/transfer-cancelled/transfer-cancelled.component';
import { PeerService } from './shared/api/peer.service';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'transfer', component: FileTransferStepperComponent},
  { path: 'cancel', component: TransferCancelledComponent},
  { path: ':code', component: FileDownloadComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransferApprovalComponent,
    FileTransferStepperComponent,
    FileDownloadComponent,
    TransferCancelledComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNiDGEJK09Bb1A_CRi8-bOJwlhKF8ox3g'
    }),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [PeerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
