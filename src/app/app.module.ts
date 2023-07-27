import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {LowerBannerSlideComponent} from "./lower-banner-slide/lower-banner-slide.component";
import {HeaderComponent} from "./header/header.component";
import {ShowListComponent} from "./show-list/show-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { TheatreListComponent } from './theatre-list/theatre-list.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {CommonServiceService} from "./services/common-service.service";
import {HttpClientModule} from "@angular/common/http";
import { ScreenComponent } from './screen/screen.component';
import { ScreenListComponent } from './screen-list/screen-list.component';
import { ShowComponent } from './show/show.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    HeaderComponent,
    LowerBannerSlideComponent,
    ShowListComponent,
    HomeComponent,
    SelectSeatComponent,
    TheatreListComponent,
    BookingHistoryComponent,
    BookTicketComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    LandingPageComponent,
    ScreenComponent,
    ScreenListComponent,
    ShowComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CommonServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
