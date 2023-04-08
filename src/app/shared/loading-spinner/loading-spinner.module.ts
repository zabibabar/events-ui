import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadingSpinnerComponent } from './loading-spinner.component'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerModule {}
