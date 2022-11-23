import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'wa-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() location: string = 'Bedum, NL';
  @Output() openSidenav: EventEmitter<void> = new EventEmitter();

  /**
   * The opposite of the current mode ;)
   */
  inverseMode: 'light_mode' | 'dark_mode' = 'dark_mode';

  constructor() {

  }

  onMenuOpenClick() {
    this.openSidenav.emit();
  }

  onModeButtonClick(){
    this.inverseMode = this.inverseMode === 'light_mode' ? 'dark_mode' : 'light_mode';
  }
}
