import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NftsComponent } from './nft/nfts.component'; 
import { ChainComponent } from './chain/chain/chain.component';
import { LandingComponent } from './layout/landing/landing.component';

import { SearchAddressesComponent } from './chain/search-addresses/search-addresses.component';
import { MaterialModule } from './material.module';
 
import { ContactusComponent } from './layout/contactus/contactus.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';

import { UsersComponent } from './users/users.component';
import { HomeComponent } from './layout/home.component';
 
import { AddressResolver } from './nft/address-resolver';
import { AddressComponent } from './nft/address/address.component';
// import { AdminuserComponent } from './components/users/adminuser.component';
import { ProtoCoinsComponent } from './dashboard/proto-coins/proto-coins.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';

export const routes: Routes = [

  { path: '', component: ProtoCoinsComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'chains', component: ChainComponent },
  { path: 'chains/:id', component: ChainComponent },


  
  { path: "proto-coins", component: ProtoCoinsComponent }, 
 { path: 'proto-coins/new', component: DashboardItemComponent},

  { path: 'LandingComponent', component: LandingComponent },

  { path: 'LandingComponent/:id', component: LandingComponent },


  { path: 'home', component: HomeComponent },

  { path: 'nfts', component: NftsComponent },
  { path: "search-addresses", component: SearchAddressesComponent }, 
 { path: 'addresses', component: AddressComponent}, 
  {
    path: 'addresses/:name ', component: AddressComponent,
    resolve: {
      nftRef: AddressResolver
    }
  },
  { path: 'contact', component: ContactusComponent },
  // { path: 'servers', component: ChainServersComponent }, 

  { path: 'users', component: UsersComponent },//, canActivate: [AdminGuardService, UserGuardService] },
  { path: 'users/:email', component: UsersComponent },//, canActivate: [AdminGuardService, UserGuardService] },
  
  // { path: 'admin/users', component: AdminuserComponent },//, canActivate: [AdminGuardService, UserGuardService] },
  // { path: 'admin/users/:email', component: AdminuserComponent },//, canActivate: [AdminGuardService, UserGuardService] }, 
  // { path: 'tiles/:albumId', component: PhotosComponent },   
  { path: '**', redirectTo: '' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes),
    // CommonModule,
    MaterialModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
