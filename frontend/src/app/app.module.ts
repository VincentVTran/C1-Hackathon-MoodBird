import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverallPageComponent } from './pages/overall-page/overall-page.component';
import { RealtimePageComponent } from './pages/realtime-page/realtime-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OverallPageComponent,
    RealtimePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
