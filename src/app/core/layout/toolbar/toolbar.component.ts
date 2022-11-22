import { Component, Input } from '@angular/core';

@Component({
  selector: 'wa-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() location: string = 'Bedum, NL';

}
