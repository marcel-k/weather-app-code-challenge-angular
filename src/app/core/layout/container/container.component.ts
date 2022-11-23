import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'wa-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  
  @ViewChild('sidenav') sideNav!: MatSidenav;
  constructor() {
  
  }

  toggleSideNav() {
    this.sideNav.toggle();
  }
}
