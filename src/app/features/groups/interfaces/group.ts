import { Member } from './member'

export interface Group {
  id: string
  name: string
  description?: string
  members?: Member[]
}
