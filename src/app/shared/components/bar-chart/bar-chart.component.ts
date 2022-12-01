import { Component, Input } from '@angular/core';
import { BarChartModel } from './bar-chart.model';

@Component({
  selector: 'wa-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  @Input() model!: BarChartModel;
 
}
