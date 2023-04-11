import { Observable } from 'rxjs'

export interface DialogConfirmationData {
  title: string
  message: string
  type: 'success' | 'error'
  primaryCTA: string
  onSubmit: (...args: any[]) => void
  isLoading$: Observable<boolean>
  secondaryCTA?: string
}
