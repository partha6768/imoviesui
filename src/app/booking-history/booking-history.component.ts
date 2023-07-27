import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  theaterList: any = [];
  showList: any = [];
  constructor(private fb: FormBuilder, private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.commonserviceService.getAll('show?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.showList = data.content;
      this.commonserviceService.getAll('booking?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
        this.theaterList = data.content;
        this.theaterList.forEach((a :any)=> {
          const obj = this.showList.filter((b :any) => b.id === a.showId)[0];
          a.movieTitle= obj.movieTitle;
        });
      });
    });
  }
}
