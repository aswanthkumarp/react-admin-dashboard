import type { User, UserSort, UsersResponse } from '../../features/users/types'
import { api } from './client'

export const PAGE_SIZE = 8

type FetchUsersParams = {
  page: number
  search: string
  sort: UserSort
}

export async function fetchUsers({ page, search, sort }: FetchUsersParams) {
  const skip = (page - 1) * PAGE_SIZE
  const endpoint = search ? '/users/search' : '/users'

  console.log('[users] fetching list', { page, search, sort })

  const { data } = await api.get<UsersResponse>(endpoint, {
    params: {
      limit: PAGE_SIZE,
      skip,
      sortBy: sort.field,
      order: sort.order,
      ...(search ? { q: search } : {}),
    },
  })

  return data
}

export async function fetchUserById(id: number) {
  console.log('[users] fetching details', { id })
  const { data } = await api.get<User>(`/users/${id}`)
  return data
}
