import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(private fb :FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm.value);
    //this.router.navigate([this.returnUrl]);
    this.authenticationService.login(this.details.email.value, this.details.password.value)
    .pipe(first())
    .subscribe(
      data => {
      this.router.navigate([this.returnUrl]);
    },
    error => {
      this.alertService.error(error);
    });
  }

  get details(){
    return this.loginForm.controls;
  }

  // checkLogin() {
  //   this.checkPass = true;
  //   if(this.loginForm.controls['email'].value ==="tops" && this.loginForm.controls['password'].value ==="tops@123"){
  //     this.message = "Login Success";
  //   }else {
  //     this.message = "E-Mail or Password is InCorrect";
  //   }
  // }

}
