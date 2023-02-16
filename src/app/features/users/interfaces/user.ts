export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
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
}
