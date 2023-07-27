import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  theaterList: any = [];
  audioList: any = [];
  viewList: any = [];
  seatList: any = [];
  seatTmpList: any = [];
  screenObj: any = {};

  constructor(private fb: FormBuilder, private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit() {
    this.commonserviceService.getAll('view-type?pageNo=0&pageSize=100&sortBy=name').subscribe((data: any) => {
      this.viewList = data.content;
    });
    this.commonserviceService.getAll('audio-type?pageNo=0&pageSize=100&sortBy=name').subscribe((data: any) => {
      this.audioList = data.content;
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

  saveScreen(screenObj :any, seatTmpList :any) {
    const obj = {
      name: screenObj.name,
      theaterId: parseInt(screenObj.theaterId),
      viewTypeName: screenObj.viewTypeName,
      audioTypeName: screenObj.audioTypeName,
      screenSeatTypes: []
    };
    const screenSeatTypes :any[] = []
    if (seatTmpList && seatTmpList.length > 0) {
      seatTmpList.forEach((seat :any) => {
        const seats :any[] = [];
        for (let i = 1; i <= seat.seatColNum; i++) {
          for (let j = 1; j <= seat.seatRowNum; j++) {
            seats.push({
              rowNum: j,
              columnNum: i
            })
          }
        }
        screenSeatTypes.push({
          seatTypeName: seat.seatTypeName,
          seats: seats
        })
      });
    }
    // @ts-ignore
    obj.screenSeatTypes = screenSeatTypes;
    this.commonserviceService.save('screen', obj).subscribe((data: any) => {
      this.router.navigate(["app/screen-list"]);
    });
    this.router.navigate(["app/screen-list"]);
  }

  addSeat() {
    this.seatTmpList.push({
      seatTypeName: '',
      seatRowNum: 0,
      seatColNum: 0
    })
  }

  cancelScreen() {
    this.router.navigate(["app/screen-list"]);
  }
}
