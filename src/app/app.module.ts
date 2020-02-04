import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ReHeaderComponent } from './re-header/re-header.component';
import { ReFilterComponent } from './re-filter/re-filter.component';
import { ReListComponent } from './re-list/re-list.component';
import { ItemComponent } from './re-list/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ReHeaderComponent,
    ReFilterComponent,
    ReListComponent,
    ItemComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
