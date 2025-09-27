import { useLiveQuery } from '@tanstack/react-db'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchUsersMock } from '../api/handlers/users.mock'
import { type UsersList } from '../api/types/users.types'
import { ensureUsersCollectionIsReady, usersCollection } from '../db/usersCollection'

type Parameters_ = { page: number; perPage: number }

export const USERS_LIST_KEY = 'users:list'
const USERS_LIST_TOTAL_KEY = 'users:list:total'

export const useUsersPage = (parameters: Parameters_) => {
  const queryClient = useQueryClient()

  const { error, isFetching } = useQuery<UsersList>({
    queryFn: async () => {
      const dto = await fetchUsersMock(parameters)

      await ensureUsersCollectionIsReady()

      usersCollection.utils.writeBatch(() => {
        const incoming = new Map(dto.data.map((u) => [u.id, u]))

        // remove old items which no in new data
        for (const [k] of usersCollection.entries()) {
          if (!incoming.has(k as number)) {
            usersCollection.utils.writeDelete(k)
          }
        }

        // insert / update with new items
        for (const u of incoming.values()) {
          usersCollection.utils.writeUpsert(u)
        }
      })

      queryClient.setQueryData([USERS_LIST_TOTAL_KEY], dto.totalCount)

      return dto
    },
    queryKey: [USERS_LIST_KEY, parameters],
    retry: false,
  })

  const { data: users = [] } = useLiveQuery((q) =>
    q.from({ u: usersCollection }).select(({ u }) => ({
      first_name: u.first_name,
      id: u.id,
      last_name: u.last_name,
      email: u.email,
    })),
  )

  const totalCount = queryClient.getQueryData<number>([USERS_LIST_TOTAL_KEY]) || 0

  return { error, isFetching, totalCount, users }
}
