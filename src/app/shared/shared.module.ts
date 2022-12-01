import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { CardComponent } from './components/card/card.component';
import { EditLocationFabComponent } from './edit-location-fab/edit-location-fab.component';
import { ReplacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    CardComponent,
    EditLocationFabComponent,
    ReplacePipe,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    EditLocationFabComponent,
    ReplacePipe,
    BarChartComponent
  ]
})
export class SharedModule { }
