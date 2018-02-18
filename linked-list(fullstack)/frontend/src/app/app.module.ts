import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AddlinkComponent } from './addlink/addlink.component';
import { LinksearchComponent } from './linksearch/linksearch.component';
import { FilterPipe } from './filter.pipe';
import { LinkService } from './link.service';

import { environment } from './../environments/environment';
import { routingComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AddlinkComponent,
    LinksearchComponent,
    FilterPipe,
    routingComponents
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'linkapp'),
    AngularFirestoreModule
  ],
  providers: [LinkService],
  bootstrap: [AppComponent]
})

export class AppModule { }
