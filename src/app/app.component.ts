import {Component} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='jaxshop';

  constructor(public authService: AuthenticationService,
              private router: Router,
              private dialogRef: MatDialog
  ) {
  }
  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    });
  }

}
