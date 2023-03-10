export interface UserAuth {
  [key: string]: unknown
  sub?: string
  name?: string
  given_name?: string
  family_name?: string
  nickname?: string
  email?: string
  picture?: string
  updated_at?: string
  locale?: string
  email_verified?: boolean
  is_new?: boolean
}
