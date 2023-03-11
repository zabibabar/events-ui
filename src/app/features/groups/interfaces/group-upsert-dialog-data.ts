import { GroupCreatedto } from '../dtos/group-create-dto'
import { GroupUpdatedto } from '../dtos/group-update-dto'
import { Group } from './group'

export interface GroupUpsertDialogData {
  title: string
  group?: Group
  onSubmit: (group: GroupCreatedto | GroupUpdatedto) => void
  submitText: string
}
