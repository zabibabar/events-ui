import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SectionComponent, SectionHeaderDirective } from './section'

@NgModule({
  declarations: [SectionComponent, SectionHeaderDirective],
  imports: [CommonModule],
  exports: [SectionComponent, SectionHeaderDirective]
})
export class SectionModule {}
