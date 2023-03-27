import { GroupCreateDto } from '../dtos/group-create-dto'
import { GroupUpdateDto } from '../dtos/group-update-dto'
import { Group } from './group'

export interface GroupUpsertDialogData {
  title: string
  group?: Group
  onSubmit: (group: GroupCreateDto | GroupUpdateDto) => void
  submitText: string
}
