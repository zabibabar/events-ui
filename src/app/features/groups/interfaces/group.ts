import { Member } from './member'

export interface Group {
  id: string
  name: string
  picture: string
  inviteCode: string
  description?: string
  members: Member[]
}
