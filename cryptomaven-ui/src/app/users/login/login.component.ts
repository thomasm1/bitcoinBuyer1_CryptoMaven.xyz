import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../../models/LoginModel';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../services';
import { User } from '../../models/User';
import { environment } from '../../../environments/environment';
import { AuthFirebaseStoreService } from '../../services/auth/auth-firebase-store.service';
import { AuthStore } from '../../services/auth/auth-aws-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  adminData = new User();
  title: string = "";
  user: LoginModel = new LoginModel();
  hide = true;
  loading = false;
  submitted = false;
  returnUrl!: string;
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authStore: AuthStore,
    private adminService: AuthFirebaseStoreService,
    private alertService: AlertService
  ) {
    ///////////////////////////////// uncomment after fixing AUTH
    // redirenUct to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
    this.loginForm = formBuilder.group({
      usernameOrEmail: [this.user.usernameOrEmail,
      [Validators.required, Validators.email]],
      password: [this.user.password,
      [Validators.required, Validators.minLength(4), Validators.maxLength(30)]]
    });
  }
  

  ngOnInit() {
    this.title = "LOGIN";
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  onAwsLogin() {
    const val = this.loginForm.value;
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();
    this.loading = true;
    this.authStore.login(val.usernameOrEmail, val.password)
      .subscribe(
        () => {
          localStorage.setItem('usernameOrEmail', val.usernameOrEmail);
        

          this.router.navigateByUrl(`/`)
        },
        err => {
          alert("login failed");
 
        }
      )

  }
  // convenience getter for easy access to form fields
  // get fromInput() { return this.form.controls; }
  onFirebaseLogin() {
    const val = this.loginForm.value;
    this.submitted = true;
    this.loading = true;
    this.adminService.login(val.email, val.password)
      .subscribe(
        () => {

          localStorage.setItem('email', val.email);
          this.router.navigateByUrl(`/`);
        },
        err => {
          alert("login failed");
        }
      )
  }
  /*
                 *displayName  email :  "thomas1.maestas@gmail.com"
                 expiresIn :  "3600"
                 idToken :  "ey fQ.eyJc5MjY4NzY5LCJlbWFpbCI6InRob21h.M-7MtEfmA"
                 kind :  "identitytoolkit#VerifyPasswordResponse"
                 localId :  "JSjs71KXkoOFAIcvbEDP3tCBcd72"
                 refreshToken :  "APJWN8dCHcFTdGRJIUVrhr3i8qlPYpAI_NGKATFhoI42AOEJXcMaGJl8rJk6G66kbIqTH-OnlLtbKfblDbQXFIi4twZAJ_NQzOnjCr9RNt8EpduUySu7b_s8dcQSZCTLwr54Xni_BlJEau4Q82OZ6A--cWQXcSzWLs6YgVJ9nZdn09RPaguFbpZLXL_O-qpxd840ndCSQmcrG7aj6kdARSTttnIenmHG-b5DHFL6fUF1HxTxpzDv9nc"
                 registered :  true
                 */

}
