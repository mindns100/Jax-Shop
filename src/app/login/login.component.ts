import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',Validators.required)
  })

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const { email,password } = this.loginForm.value;
    this.authService.login(email,password).pipe(
      this.toast.observe({
        success: 'Sikeres belépés!',
        loading: 'Betöltés...',
        error: 'Sikertelen belépés!'
      })
    ).subscribe(() =>{
      //this.router.navigate(['/home']);
      const redirectUrl =  this.authService.redirectUrl || '/home'; // use the redirectUrl if set, else redirect to /home
      this.router.navigate([redirectUrl]);
      this.authService.redirectUrl = '/home'; // reset the redirectUrl after navigating
    });
  }

}
