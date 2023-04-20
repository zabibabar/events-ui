export interface User {
  id: string
  name: string
  picture: string
}

export interface CurrentUser extends User {
  externalId: string
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  locale: string
}
