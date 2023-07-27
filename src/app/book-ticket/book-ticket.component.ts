import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  showList:any[] = [];
  moveObj :any = {};
  showDateList:any[] = [];
  selectedFilterDate: any;
  constructor(public commonserviceService: CommonServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe( paramMap => {
      this.commonserviceService.getAll('show?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
        this.showList = data.content.filter((a:any) => a.movieId == parseInt(paramMap.get('movieId') || '0'));
        this.moveObj = this.showList[0];
        this.getDatesInRange(new Date(new Date(this.moveObj.startTs).toDateString()), new Date(new Date(this.moveObj.endTs).toDateString()));
        this.selectedFilterDate = this.showDateList[0];
      });
    })
  }
  getDatesInRange(startDate :any, endDate :any) {
    const date = new Date(startDate.getTime());
    this.showDateList = [];
    while (date <= endDate) {
      if (date >= new Date(new Date().toDateString())){

      }
      this.showDateList.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  selectSeat(id:any, calenderId:any) {
    this.router.navigate(["app/select-seat", id , calenderId]);
  }

  getShowCalender(showCalendars: any[]) {
    return showCalendars.filter(a => {
        return new Date(new Date(a.showRunDate).toDateString()).getTime() === new Date(this.selectedFilterDate).getTime();
    });
  }
}
