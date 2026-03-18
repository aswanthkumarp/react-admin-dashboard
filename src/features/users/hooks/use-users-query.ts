import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../../../lib/api/users'

export function useUsersQuery(page: number, search: string) {
  return useQuery({
    queryKey: ['users', page, search],
    queryFn: () => fetchUsers({ page, search }),
    placeholderData: keepPreviousData,
  })
}
