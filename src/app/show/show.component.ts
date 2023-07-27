import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit{
  theaterList: any = [];
  movieList: any = [];
  screenList: any = [];
  seatList: any = [];
  seatTmpList: any = [];
  showObj: any = {};
  screenObj: any = {};

  constructor(private fb: FormBuilder, private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit(){
    this.commonserviceService.getAll('movie?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.movieList = data.content;
    });
    this.commonserviceService.getAll('seat-type?pageNo=0&pageSize=100&sortBy=name').subscribe((data: any) => {
      this.seatList = data.content;
    });
    this.loadTheater();
  }
  loadTheater(){
    this.commonserviceService.getAll('theater?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.theaterList = data.content;
    });
  }

  loadScreen(id :any) {
    this.commonserviceService.getById('screen/', id).subscribe((data: any) => {
      this.screenList = data;
    });
  }

  saveScreen(showObj :any, seatTmpList :any) {
    const movieObj = this.movieList.filter((a :any) => a.id === parseInt(showObj.movieId))[0];
    const theaterObj = this.theaterList.filter((a :any) => a.id === parseInt(showObj.theaterId))[0];
    const obj = {
      "movieId": movieObj.id,
      "movieTitle": movieObj.title,
      "genre": movieObj.genere,
      "languageName": 'English',
      "thumbnailUrl": movieObj.thumbnailUrl,
      "trailerUrl": movieObj.trailerUrl,
      "viewTypeName": '2D',
      "duration": movieObj.duration,
      "screenName": showObj.screenName,
      "theaterId": theaterObj.id,
      "theaterDisplayName": theaterObj.displayName,
      "cityId": theaterObj.cityId,
      "startTs": showObj.startTs + 'T00:00:00',
      "endTs": showObj.endTs + 'T00:00:00',
      "showCalendars": showObj.showCalendars
    };
    obj.showCalendars.forEach((sCld : any)=> {
      sCld.startTime = sCld.showRunDate + 'T' + sCld.startTime + ':00';
      sCld.endTime = sCld.showRunDate + 'T' + sCld.endTime + ':00';
      sCld.showCalendarPrices = [];
      this.screenObj.screenSeatTypes.forEach((sCl : any)=> {
        sCld.showCalendarPrices.push({
          "screenSeatTypeId": sCl.id,
          "price": parseInt(sCl.price),
          "priceBeforeTax": 240,
          "gst": 60,
          "cgst": 30,
          "sgst": 30,
        });
      });
    });
    this.commonserviceService.save('show', obj).subscribe((data: any) => {
      this.router.navigate(["app/show-list"]);
    });
  }

  addSeat(obj :any) {
    if (obj.showCalendars) {
      obj.showCalendars.push({});
    } else {
      obj.showCalendars = [];
      obj.showCalendars.push({});
    }
  }

  cancelScreen() {
    this.router.navigate(["app/show-list"]);
  }

  setScreen(screenName: any) {
    this.screenObj = this.screenList.filter((a :any) => a.name === screenName)[0];
  }
}
