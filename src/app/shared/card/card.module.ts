import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CardComponent, CardHeaderDirective } from './card'

@NgModule({
  declarations: [CardComponent, CardHeaderDirective],
  imports: [CommonModule],
  exports: [CardComponent, CardHeaderDirective]
})
export class CardModule {}
