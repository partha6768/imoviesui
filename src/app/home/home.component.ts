import { Component, OnInit } from '@angular/core';
import {CommonServiceService} from "../services/common-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @ts-ignore
  movieList: any = [];
  searchText: any;
  constructor(public commonserviceService: CommonServiceService, private router: Router) { }

  ngOnInit() {
    this.commonserviceService.getAll('movie?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.movieList = data.content;
    });
  }

  bookTicket(id :any) {
    this.router.navigate(["app/book-ticket", id]);
  }

  filterList() {
    if (!this.searchText) {
      return this.movieList;
    }
    return this.movieList.filter((name :any) => name.title.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
