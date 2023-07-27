import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ShowListComponent} from "./show-list/show-list.component";
import {SelectSeatComponent} from "./select-seat/select-seat.component";
import {TheatreListComponent} from "./theatre-list/theatre-list.component";
import {BookingHistoryComponent} from "./booking-history/booking-history.component";
import {BookTicketComponent} from "./book-ticket/book-ticket.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {ProfileComponent} from "./profile/profile.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ScreenListComponent} from "./screen-list/screen-list.component";
import {ScreenComponent} from "./screen/screen.component";
import {ShowComponent} from "./show/show.component";
import {MovieComponent} from "./movie/movie.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app/home',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {path: 'app', component: LandingPageComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'show', component: ShowComponent},
      {path: 'show-list', component: ShowListComponent},
      {path: 'screen', component: ScreenComponent},
      {path: 'movie', component: MovieComponent},
      {path: 'screen-list', component: ScreenListComponent},
      {path: 'theater-list', component: TheatreListComponent},
      {path: 'booking-history', component: BookingHistoryComponent},
      {path: 'book-ticket/:movieId', component: BookTicketComponent},
      {path: 'select-seat/:showId/:calenderId', component: SelectSeatComponent}
  ]},
  {
    path: '**',
    redirectTo: 'app/home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
