import { createCollection } from '@tanstack/react-db'

import { queryCollectionOptions, type QueryCollectionUtils } from '@tanstack/query-db-collection'

import { queryClient } from '../api/client/queryClient'
import { User } from '../api/types/users.types'

export const usersCollection = createCollection<User, number | string, QueryCollectionUtils<User>>(
  queryCollectionOptions<User>({
    id: 'users',
    getKey: (u) => u.id,
    queryClient,
    queryFn: async ({ queryKey }) => queryClient.getQueryData<User[]>(queryKey) ?? [],
    queryKey: ['users:collection'],
    startSync: true,
  }),
)

export const ensureUsersCollectionIsReady = async () => {
  if (!usersCollection.isReady()) {
    usersCollection.startSyncImmediate()
    await usersCollection.stateWhenReady()
  }
}
