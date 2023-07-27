import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CognitoService, IUser} from "../cognito.service";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: IUser;
  cityList: any;
  selectedCity: any = {};
  userType :any = 'Customer';
  constructor(private router: Router, private cognitoService: CognitoService, private commonserviceService: CommonServiceService) {
    this.user = {} as IUser;
  }

  ngOnInit() {
    this.commonserviceService.getAll('city?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.cityList = data;
      this.selectedCity = data[0];
      localStorage.setItem('SELECTED_CITY', JSON.stringify(this.selectedCity));
    });
    this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
        this.commonserviceService.getById('user', this.user.email).subscribe((data: any) => {
          this.userType = data.userTypeName;
          localStorage.setItem('USER', JSON.stringify(data));
        });
      });
  }

  addShow() {
    this.router.navigate(["app/show-list"]);
  }
  addTheater() {
    this.router.navigate(["app/theater-list"]);
  }
  bookingHistory() {
    this.router.navigate(["app/booking-history"]);
  }
  public signOut(): void {
    this.cognitoService.signOut()
      .then(() => {
        this.router.navigate(['/signIn']);
      });
  }
  changeCity(d: any) {
    this.selectedCity = d;
    localStorage.setItem('SELECTED_CITY', JSON.stringify(this.selectedCity));
  }

  addScreen() {
    this.router.navigate(["app/screen-list"]);
  }

  addMovie() {
    this.router.navigate(["app/movie"]);
  }
}
