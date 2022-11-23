import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wa-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() location: string = 'Bedum, NL';
  @Output() onToggleSidenav: EventEmitter<void> = new EventEmitter();

  constructor() {

  }

  onMenuOpenClick() {
    this.onToggleSidenav.emit();
  }
}
