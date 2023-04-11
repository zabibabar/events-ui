import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Store } from '@ngrx/store'
import { UserUpdateDto } from '../../dtos/user-update-dto'
import { UserUpdateDialogData } from '../../interfaces/user-update-form-dialog'
import { CloseUpdateUserFormDialog } from '../../store/user/user.actions'
import { selectIsLoadingUserAction } from '../../store/user/user.selectors'

type UserUpdateFormType = FormGroup<{
  firstName: FormControl<string>
  lastName: FormControl<string>
  name: FormControl<string>
}>

@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit {
  user = this.data.user
  title = this.data.title
  onSubmit = this.data.onSubmit
  submitText = this.data.submitText

  userUpdateForm: UserUpdateFormType
  isSubmitting$ = this.store.select(selectIsLoadingUserAction)

  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private data: UserUpdateDialogData
  ) {}

  ngOnInit(): void {
    this.userUpdateForm = this.fb.group({
      firstName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      lastName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    })

    if (this.data.user) this.userUpdateForm.patchValue(this.data.user)
  }

  submit(): void {
    const newUser = this.getDirtyFields(this.userUpdateForm)

    this.onSubmit(newUser)
  }

  onCancel(): void {
    this.store.dispatch(CloseUpdateUserFormDialog())
  }

  private getDirtyFields(formGroup: FormGroup): Partial<UserUpdateDto> {
    const dirtyValues: Record<string, string> = {}
    Object.keys(formGroup.controls).forEach((c) => {
      const currentControl = formGroup.get(c)

      if (currentControl?.dirty) {
        dirtyValues[c] = currentControl.value
      }
    })
    return dirtyValues
  }
}
