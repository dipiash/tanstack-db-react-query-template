export type User = {
  first_name: string
  id: number
  last_name: string
  email: string
}

export type UsersList = { data: User[]; totalCount: number }
