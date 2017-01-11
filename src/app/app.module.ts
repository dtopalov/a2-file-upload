import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { UploadModule } from '@progress/kendo-angular-upload';

import { AppComponent } from './app.component';
import { FormUploadService } from './services/';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UploadModule
  ],
  providers: [FormUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
