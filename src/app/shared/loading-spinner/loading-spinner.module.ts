import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { LoadingSpinnerDirective } from './loading-spinner.directive'

@NgModule({
  declarations: [LoadingSpinnerDirective],
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  exports: [LoadingSpinnerDirective]
})
export class LoadingSpinnerModule {}
