import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { ThemePalette } from '@angular/material/core'
import { MatIcon } from '@angular/material/icon'

@Directive({
  selector: 'button[loadingSpinner]'
})
export class LoadingSpinnerDirective implements OnChanges {
  @Input('loadingSpinner') isLoading: boolean
  @Input() color: ThemePalette = 'primary'
  private icon: ComponentRef<MatIcon> | null

  constructor(
    private elementRef: ElementRef<HTMLButtonElement>,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const isLoading = changes['isLoading']

    if (isLoading.currentValue) {
      this.elementRef.nativeElement.setAttribute('disabled', 'true')
      this.createSpinner()
    }

    if (!isLoading.currentValue) {
      this.elementRef.nativeElement.removeAttribute('disabled')
      this.destroySpinner()
    }
  }

  private createSpinner(): void {
    if (this.icon) return

    const spinner = this.viewContainerRef.createComponent(MatProgressSpinner)
    spinner.instance.color = this.color
    spinner.instance.diameter = 18
    spinner.instance.mode = 'indeterminate'

    this.icon = this.viewContainerRef.createComponent(MatIcon, {
      projectableNodes: [[spinner.location.nativeElement]]
    })

    this.renderer.insertBefore(
      this.elementRef.nativeElement,
      this.icon.instance._elementRef.nativeElement,
      this.elementRef.nativeElement.firstChild
    )
  }

  private destroySpinner(): void {
    if (!this.icon) return

    this.icon.destroy()
    this.icon = null
  }
}
