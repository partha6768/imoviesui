import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  selectedCity: any;
  theaterList: any = [];
  theaterObj: any = {};
  constructor(private fb: FormBuilder, private router: Router, private commonserviceService: CommonServiceService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.commonserviceService.getAll('movie?pageNo=0&pageSize=100&sortBy=id').subscribe((data: any) => {
      this.theaterList = data.content;
    });
  }

  changeCity(d: any) {
    this.selectedCity = d;
  }
  displayStyle = "none";
  lngTmpList: any;

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  save(obj: any) {
    obj.movieTypeName = 'Movie';
    obj.releaseTs  = obj.releaseTs + 'T00:00:00';
    this.commonserviceService.save('movie', obj).subscribe((data: any) => {
      this.load();
      this.closePopup();
    });
  }

  addLanguage(obj :any) {
    if (obj.movieViewType) {
      obj.movieViewType.push({});
    } else {
      obj.movieViewType = [];
      obj.movieViewType.push({});
    }
  }
}
