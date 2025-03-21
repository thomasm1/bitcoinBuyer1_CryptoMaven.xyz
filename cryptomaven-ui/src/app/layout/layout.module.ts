import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { FooterComponent } from './footer.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { ContactusComponent } from './contactus/contactus.component';

@NgModule({
  declarations: [MenuComponent, FooterComponent, SidenavListComponent, HomeComponent, LoaderComponent, ContactusComponent],
  imports: [CommonModule, RouterModule], // Only modules here
  exports: [MenuComponent, FooterComponent, SidenavListComponent, HomeComponent, LoaderComponent, ContactusComponent], // Export all components used outside
  providers: [], // Only services here
})
export class LayoutModule {}
