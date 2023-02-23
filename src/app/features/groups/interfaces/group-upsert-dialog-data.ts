import { GroupCreateDTO } from '../dtos/group-create-dto'
import { GroupUpdateDTO } from '../dtos/group-update-dto'
import { Group } from './group'

export interface GroupUpsertDialogData {
  title: string
  group?: Group
  onSubmit: (group: GroupCreateDTO | GroupUpdateDTO) => void
  submitText: string
}
