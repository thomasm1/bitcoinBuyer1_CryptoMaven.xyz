import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
@NgModule({
  declarations: [
    RegisterComponent, 
    LoginComponent,
    UserComponent, 
    UsersComponent ,
  ],  
  imports: [
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon,
    MatInputModule,
    MatFormFieldModule,
    CommonModule, RouterModule],   
  exports: [
    LoginComponent, 
    RegisterComponent,
    UsersComponent,
    UserComponent
  ], 
})
export class UsersModule {}
