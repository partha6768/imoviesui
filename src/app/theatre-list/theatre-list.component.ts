import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-theatre-list',
  templateUrl: './theatre-list.component.html',
  styleUrls: ['./theatre-list.component.css']
})
export class TheatreListComponent implements OnInit {
  cityList: any;
  selectedCity: any;
  theaterList: any = [];
  theaterObj: any = {};
  constructor(private fb: FormBuilder, private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit() {
    this.commonserviceService.getAll('city?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.cityList = data;
      this.selectedCity = data[0];
    });
    this.load();
  }

  load(){
    this.commonserviceService.getAll('theater?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.theaterList = data.content;
    });
  }

  changeCity(d: any) {
    this.selectedCity = d;
  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  save(obj: any) {
    const city = JSON.parse(localStorage.getItem('SELECTED_CITY') || '{}');
    obj.cityId = city?.id;
    obj.name= obj.displayName;
    this.commonserviceService.save('theater', obj).subscribe((data: any) => {
      this.load();
      this.closePopup();
    });
  }
}
