import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { ContainerComponent } from './container/container.component';
import {MatFormFieldModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material';
import {DatePipe} from '@angular/common';
import {MatNativeDateModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule, MatInputModule,MatNativeDateModule,BrowserAnimationsModule

  ],

  providers: [DatePipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
