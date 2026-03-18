import type { UsersResponse } from '../../features/users/types'
import { api } from './client'

export const PAGE_SIZE = 8

type FetchUsersParams = {
  page: number
  search: string
}

export async function fetchUsers({ page, search }: FetchUsersParams) {
  const skip = (page - 1) * PAGE_SIZE
  const endpoint = search ? '/users/search' : '/users'

  console.log('[users] fetching list', { page, search })

  const { data } = await api.get<UsersResponse>(endpoint, {
    params: {
      limit: PAGE_SIZE,
      skip,
      ...(search ? { q: search } : {}),
    },
  })

  return data
}
