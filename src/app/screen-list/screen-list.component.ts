import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {

  screenList: any;
  constructor(private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.commonserviceService.getAll('screen?pageNo=0&pageSize=100&sortBy=theaterId').subscribe((data: any) => {
      this.screenList = data.content;
    });
  }

  addScreen() {
    this.router.navigate(["app/screen"]);
  }
}
