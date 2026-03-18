import {
  keepPreviousData,
  useQuery,
} from '@tanstack/react-query'
import { fetchUserById, fetchUsers } from '../../../lib/api/users'
import type { UserSort } from '../types'

export function useUsersQuery(page: number, search: string, sort: UserSort) {
  return useQuery({
    queryKey: ['users', page, search, sort.field, sort.order],
    queryFn: () => fetchUsers({ page, search, sort }),
    placeholderData: keepPreviousData,
  })
}

export function useUserDetailQuery(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: Number.isInteger(id) && id > 0,
  })
}
