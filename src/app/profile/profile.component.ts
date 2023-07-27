import { Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';
import {Router} from "@angular/router";
import {CommonServiceService} from "../services/common-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: IUser;
  userTypes: any = [];
  selectedUserType: any;

  constructor(private cognitoService: CognitoService, private router: Router, private commonserviceService: CommonServiceService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public ngOnInit(): void {
    this.commonserviceService.getAll('user-type?pageNo=0&pageSize=100&sortBy=name').subscribe((data: any) => {
      this.userTypes = data.content;
    });
    this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
        if (this.user && this.user.name) {
          this.commonserviceService.getById('user', this.user.email).subscribe((data: any) => {
            localStorage.setItem('USER', JSON.stringify(data));
          });
          this.router.navigate(['/app/home']);
        }
      });
  }

  public update(): void {
    this.loading = true;
    this.cognitoService.updateUser(this.user)
      .then(() => {
        this.loading = false;
        const obj = {
          "id": this.user.email,
          "name": this.user.name,
          "userTypeName": this.selectedUserType,
          "email": this.user.email,
          "mobile": ''+this.user.phone,
          "active": 1
        };
        this.commonserviceService.save('user', obj).subscribe((data: any) => {
          localStorage.setItem('USER', JSON.stringify(this.user));
        });
        this.router.navigate(['/app/home']);
      }).catch(() => {
      this.loading = false;
    });
  }

  home() {
    this.router.navigate(['/app/home']);
  }
}
