import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  // standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent {
  @Input( ) image!: { src: string; alt: string };
  @Input( ) description!: string;
  // image = input.required<{ src: string; alt: string }>();
  // title = input.required<string>();
}
