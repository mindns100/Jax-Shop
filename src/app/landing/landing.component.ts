import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private toast: HotToastService) { }

  ngOnInit(): void {
  }

}
