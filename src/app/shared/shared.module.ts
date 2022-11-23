import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CardComponent } from './components/card/card.component';
import { EditLocationFabComponent } from './edit-location-fab/edit-location-fab.component';
import { ReplacePipe } from './pipes/replace.pipe';

@NgModule({
  declarations: [
    CardComponent,
    EditLocationFabComponent,
    ReplacePipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    EditLocationFabComponent,
    ReplacePipe
  ]
})
export class SharedModule { }
