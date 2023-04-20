import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function EventTimeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const now = new Date().getTime()
    const startDate = new Date(group.get('timeStart')?.value).getTime()
    const endDate = new Date(group.get('timeEnd')?.value).getTime()

    if (!startDate && !endDate) return null
    if (startDate < now) group.get('timeStart')?.setErrors({ invalidDate: 'Start Date should be in future' })
    if (startDate >= endDate) group.get('timeEnd')?.setErrors({ invalidDate: 'End Date should be after Start Date' })

    return null
  }
}
