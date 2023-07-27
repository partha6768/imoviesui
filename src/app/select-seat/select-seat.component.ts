import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CommonServiceService} from "../services/common-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-select-seat',
  templateUrl: './select-seat.component.html',
  styleUrls: ['./select-seat.component.css']
})
export class SelectSeatComponent  implements OnInit, AfterViewInit{
  seatlist = ['A', 'B'];
  seatlistBasic = [ 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  noOfTicket = 0;
  showObj :any = {};
  screenObj :any = {};
  showCalendarPrices: any = {};
  showId = 0;
  showCalendarId = 0;
  constructor(public commonserviceService: CommonServiceService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe( paramMap => {
      this.showId = parseInt(paramMap.get('showId') || '0');
      this.showCalendarId = parseInt(paramMap.get('calenderId') || '0');
      this.commonserviceService.getById('show', parseInt(paramMap.get('showId') || '0')).subscribe((data: any) => {
        this.showObj = data;
        this.commonserviceService.getById('screen', this.showObj.theaterId + '/' + this.showObj.screenName).subscribe((data1: any) => {
          this.screenObj = data1;
          this.screenObj.screenSeatTypes.forEach((o:any) => {
            o.screenMap = this.groupBy(o.seats, (seat :any) => seat.columnNum);
          })
        });
        this.showCalendarPrices = this.showObj.showCalendars.filter((a:any) => a.id === parseInt(paramMap.get('calenderId') || '0'))[0];
      });
    })
  }
  groupBy(list :any, keyGetter :any) {
    const map  = new Map();
    list.forEach((item :any) => {
      const key = keyGetter(item);
      item.selected = false;
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  payTicket() {
    const user = JSON.parse(localStorage.getItem('USER') || '{}');
    let selectedSeat :any[] = [];
    let seatIds :any[] = [];
    let priceTotal = 0;
    this.screenObj.screenSeatTypes.forEach((o:any) => {
      for (let [key, value] of o.screenMap) {
        const tmplist = value.filter((a:any) => a.selected);
        tmplist.forEach((a:any) => {
          a.screenSeatTypeId = o.id;
          a.price = this.showCalendarPrices.showCalendarPrices.filter((q:any) => q.screenSeatTypeId === o.id)[0].price;
          priceTotal += a.price;
        });
        selectedSeat.push(...tmplist);
      }
    });
    selectedSeat.forEach((a :any) => {
      seatIds.push(a.id)
    });
    console.log(selectedSeat);
    const obj = {
      "userId": user.id,
      "showId": this.showId,
      "showCalendarId": this.showCalendarId,
      "screenSeatTypeId": selectedSeat[0].screenSeatTypeId,
      "numberOfTicket": this.noOfTicket,
      "unitPrice": 0,
      "totalPrice": priceTotal,
      "priceBeforeTax": 0,
      "gst": 0,
      "cgst": 0,
      "sgst": 0,
      "seatIds": seatIds
    }
    this.commonserviceService.save('booking', obj).subscribe((data: any) => {
      this.router.navigate(['/app/booking-history']);
    });
  }

  protected readonly Array = Array;

  selectSeat(se:any) {
    se.selected = !se.selected;
    if (se.selected) {
      this.noOfTicket = this.noOfTicket + 1;
    } else {
      this.noOfTicket = this.noOfTicket - 1;
    }
  }
}
