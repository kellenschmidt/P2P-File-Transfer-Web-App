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
import { PeerService } from './shared/api/peer.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'transfer', component: FileTransferStepperComponent},
  { path: ':code', component: FileDownloadComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransferApprovalComponent,
    FileTransferStepperComponent,
    FileDownloadComponent,
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
    RouterModule.forRoot(appRoutes),
  ],
  providers: [PeerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
