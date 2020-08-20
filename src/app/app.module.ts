import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from 'node_modules/@angular/common/http';
import { MetroInfoComponent } from './metro-info/metro-info.component';
import { MetroService } from './service/metro.service';


@NgModule({
  declarations: [
    AppComponent,
    MetroInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [MetroService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
