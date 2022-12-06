import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BarChartModel } from './bar-chart.model';
import { BarChart, BarChartInstance } from './d3-chart';

@Component({
  selector: 'wa-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnChanges, OnInit, OnDestroy {
  @Input() model!: BarChartModel;
  @Input() measureElement!: ElementRef<Element>;

  private chart!: BarChartInstance;
  private resizeObserver!: ResizeObserver;
  private dimensions = { width: 0, height: 0 };

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!this.chart && !!changes['model'].currentValue) {
      const { width, height } = this.dimensions;
      this.chart.update(changes['model'].currentValue, width, height);
    }
  }

  ngOnInit() {
    this.resizeObserver = new ResizeObserver(entries => {
      // Only care about the first element, we expect one element to be watched
      const { width, height } = entries[0].contentRect;
      this.dimensions = { width, height };

      if (!this.chart) {
        const { initialize, update } = BarChart('chart-goes-here', width, height);

        initialize();
        this.chart = { initialize, update };
      }

      if (!!this.model) {
        this.chart.update(this.model, width, height);
      }
    });

    this.resizeObserver.observe(this.measureElement.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}
