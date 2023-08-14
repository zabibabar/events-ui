import { FormGroup } from '@angular/forms'

export function getDirtyFields(formGroup: FormGroup): Record<string, string> {
  const dirtyValues: Record<string, string> = {}
  Object.keys(formGroup.controls).forEach((c) => {
    const currentControl = formGroup.get(c)

    if (currentControl?.dirty) {
      dirtyValues[c] = currentControl.value
    }
  })

  return dirtyValues
}
