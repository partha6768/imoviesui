import {Component, OnInit} from '@angular/core';
import {CognitoService, IUser} from "../cognito.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit{

  constructor(private cognitoService: CognitoService, private router: Router) {
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
      .then((success: boolean) => {
        if (!success) {
          this.router.navigate(['/signIn']);
        }
      });
  }

}
