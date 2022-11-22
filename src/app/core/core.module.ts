import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ContentComponent } from './layout/content/content.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    NavigationComponent,
    ContentComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ToolbarComponent,
    NavigationComponent,
    ContentComponent,
    FooterComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("You should import core module only in the root module")
    }
  }
}
