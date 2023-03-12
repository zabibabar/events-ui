import { GroupCreatDto } from '../dtos/group-create-dto'
import { GroupUpdatDto } from '../dtos/group-update-dto'
import { Group } from './group'

export interface GroupUpsertDialogData {
  title: string
  group?: Group
  onSubmit: (group: GroupCreatDto | GroupUpdatDto) => void
  submitText: string
}
