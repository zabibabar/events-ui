export interface DialogConfirmationData {
  title: string
  message: string
  type: 'success' | 'error'
  primaryCTA: string
  secondaryCTA?: string
}
