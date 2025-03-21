import { Component, computed, Input, signal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';

import { type User } from '../../models/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  @Input() user!: User | undefined;

  imagePath = computed(() => 'users/' + this.user?.cusUrl);
  email: string = "your_email@gmail.com";

  constructor(private userService: UserService, private route: ActivatedRoute) {
    // on page load first piece of data
  }
  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    this.loadUser(this.email); 
    console.log("email " + this.email);

  }

  public loadUser(email: string) {
    this.userService.getUser(email).subscribe((u) => {
      this.user = u;
    });
  }

 public getUser() {
    return this.user;
  }
}
