import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wa-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Output() closeSidenav: EventEmitter<void> = new EventEmitter();

  constructor(){}

  onMenuCloseClick() {
    this.closeSidenav.emit();
  }
}
