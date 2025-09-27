import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { queryClient } from './api/client/queryClient'
import { useOptimisticUserUpdate } from './hooks/useOptimisticUserUpdate'
import { useUsersPage } from './hooks/useUsersPage'

const PER_PAGE = 10

const UsersTable = () => {
  const [page, setPage] = useState(1)
  const { error, isFetching, totalCount, users } = useUsersPage({ page, perPage: PER_PAGE })
  const { mutate: patchUser } = useOptimisticUserUpdate()

  if (error) {
    return (
      <div style={{ padding: 16, border: '1px solid #f33', borderRadius: 8 }}>
        <div style={{ fontWeight: 600, marginBottom: 8 }}>Error</div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 16 }}>
      <h3>
        Users ({totalCount}) {isFetching ? '…' : ''}
      </h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>
                {u.first_name} {u.last_name}
              </td>
              <td>
                <button onClick={() => patchUser({ id: u.id, patch: { first_name: 'UPDATED' } })}>Rename to UPDATED (optimistic)</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <button disabled={page === 1 || isFetching} onClick={() => setPage((p) => Math.max(1, p - 1))} style={{ padding: '6px 10px' }}>
          ← Prev
        </button>
        <div style={{ padding: '0 8px' }}>Page {page}</div>
        <button disabled={isFetching || PER_PAGE * page >= totalCount} onClick={() => setPage((p) => p + 1)} style={{ padding: '6px 10px' }}>
          Next →
        </button>
      </div>
    </div>
  )
}

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <UsersTable />
  </QueryClientProvider>
)
