import { User, UsersList } from '../types/users.types'

export const fetchUsersMock = async (parameters: { page?: number; perPage?: number } = {}): Promise<UsersList> => {
  const page = parameters.page ?? 1
  const perPage = parameters.perPage ?? 10
  const totalCount = 125

  const start = (page - 1) * perPage + 1
  const end = Math.min(start + perPage - 1, totalCount)

  const data: User[] = []

  for (let id = start; id <= end; id++) {
    data.push({
      first_name: `User${id}`,
      id,
      last_name: `Demo`,
      email: `user${id}@example.com`,
    })
  }

  await new Promise((resolve) => setTimeout(resolve, 300)) // simulate network

  return { data, totalCount }
}

export const updateUserMock = async (id: number, patch: Partial<User>): Promise<User> => {
  const current: User = {
    first_name: `User${id}`,
    id,
    last_name: `Demo`,
    email: `user${id}@example.com`,
  }
  const updated = { ...current, ...patch }

  await new Promise((resolve) => setTimeout(resolve, 200))

  return updated
}
