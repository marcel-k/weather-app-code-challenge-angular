import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
@NgModule({
  declarations: [
    ToolbarComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error("You should import core module only in the root module")
    }
  }
}
