import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateUserMock } from '../api/handlers/users.mock'
import { type User } from '../api/types/users.types'
import { ensureUsersCollectionIsReady, usersCollection } from '../db/usersCollection'
import { USERS_LIST_KEY } from './useUsersPage'

type UpdateUserContext = { id: number; prev?: User }

export const useOptimisticUserUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<User, Error, { id: number; patch: Partial<User> }, UpdateUserContext>({
    mutationFn: ({ id, patch }) => updateUserMock(id, patch),
    onError: async (_error, _variables, context) => {
      if (context?.prev) {
        await ensureUsersCollectionIsReady()
        usersCollection.utils.writeUpdate(context.prev)
      }
    },
    onMutate: async ({ id, patch }) => {
      await queryClient.cancelQueries({ queryKey: [USERS_LIST_KEY] })
      await ensureUsersCollectionIsReady()

      const previous = usersCollection.get(id)

      if (previous) {
        usersCollection.utils.writeUpdate({ ...previous, ...patch })
      }

      return { id, prev: previous }
    },
    onSuccess: async (serverUser) => {
      await ensureUsersCollectionIsReady()
      usersCollection.utils.writeUpsert(serverUser)
    },
  })
}
