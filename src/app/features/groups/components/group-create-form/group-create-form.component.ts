import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { CreateGroupActions } from '../../store/group.actions'

@Component({
  selector: 'app-group-create-form',
  templateUrl: './group-create-form.component.html',
  styleUrls: ['./group-create-form.component.scss']
})
export class GroupCreateFormComponent implements OnInit {
  groupCreateForm: FormGroup<{
    name: FormControl<string | null>
  }>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.groupCreateForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  onSubmit(): void {
    const { name } = this.groupCreateForm.value
    this.store.dispatch(CreateGroupActions.createGroup({ name: name as string }))
    this.store.dispatch(CreateGroupActions.closeDialog())
  }

  onCancel(): void {
    this.store.dispatch(CreateGroupActions.closeDialog())
  }
}
