import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../../models/RegisterModel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormBuilder,  FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
import {UsersService} from '../users.service';
import { AlertService } from '../../services';
import { AuthFirebaseStoreService } from '../../services/auth/auth-firebase-store.service';
import { AuthStore } from '../../services/auth/auth-aws-store.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title: string = "";
  user: RegisterModel = new RegisterModel();
  registerForm!: FormGroup;
  hide = true;
  loading = false;
  submitted = false;
  email: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authStore: AuthStore,
    private authFirebaseStoreService: AuthFirebaseStoreService,
    private userService: UsersService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }


  ngOnInit() {
    this.title = "REGISTER";

    this.registerForm = this.formBuilder.group({
     
      email: [this.user.email, [  Validators.required, Validators.email ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30) 
      ]],
      firstName: [this.user.firstName, [
         
      ]],
      lastName: [this.user.lastName, [
        
      ]]
    });
  } 
  
  get f() { return this.registerForm.controls; }
  onFirebaseRegister() {
    this.submitted = true;
    this.alertService.clear();

    console.log("submitted: "+this.user.firstName + ' ' + this.user.lastName + ' ' + this.user.email  );
    this.loading = true;
    console.log("registerForm.value "+ this.registerForm.value);
    this.authFirebaseStoreService.registerFirebase(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  } 
  onAwsRegister() {
    this.submitted = true;
    this.alertService.clear();

    console.log("submitted: "+this.user.firstName + ' ' + this.user.lastName + ' ' + this.user.email  );
    this.loading = true;
    console.log("registerForm.value "+ this.registerForm.value);
    this.authStore.register(this.registerForm.value)
      .pipe(first(),
      tap((user) => {
        this.authStore.setUser(user);
      })) 
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          console.log('/users/'+this.user.email)
          this.router.navigate(['/users/'+this.user.email]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
