import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component'; 

// SERVICES
import { StoreModule } from '@ngrx/store';


// LAYOUT
import { LayoutModule } from './layout/layout.module';
import { MaterialModule } from './material.module';
import { UserGuardService } from './services/auth/user-guard.service';
import { UsersModule } from './users/users.module'; // Ensure this path is correct and the module is properly defined
import { ChainModule } from './chain/chain.module';
import { NftModule } from './nft/nft.module';
import { DashboardModule } from './dashboard/dashboard.module'; // Ensure this path is correct or create the module if it does not exist

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions'; 
@NgModule({
  declarations: [ 
    AppComponent, 
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    AppRoutingModule,
    UsersModule,  
    LayoutModule,  
    ChainModule,
    NftModule,
    DashboardModule,
  ],
  providers: [
    UserGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
