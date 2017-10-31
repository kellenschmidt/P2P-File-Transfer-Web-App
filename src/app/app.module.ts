import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { FileTransferComponent } from './views/file-transfer/file-transfer.component';
import { MatProgressBarModule, MatStepperModule, MatInputModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TransferApprovalComponent } from './views/transfer-approval/transfer-approval.component';
import { FileTransferStepperComponent } from './views/file-transfer-stepper/file-transfer-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { App1Component } from './views/input-file/app1.component';
import { InputFileComponent } from './views/input-file/input-file.component';
import { ByteFormatPipe } from './views/input-file/byte-format.pipe';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'transfer', component: FileTransferComponent},
  { path: 'stepper', component: FileTransferStepperComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileTransferComponent,
    TransferApprovalComponent,
    FileTransferStepperComponent,
    App1Component,
    InputFileComponent,
    ByteFormatPipe,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
