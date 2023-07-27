import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";

import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {

  showList: any;
  constructor(private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.commonserviceService.getAll('show?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.showList = data.content;
    });
  }

  addShow() {
    this.router.navigate(["app/show"]);
  }
}
