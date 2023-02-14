export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  email?: string
  sub?: string
  name?: string
  picture?: string
}
