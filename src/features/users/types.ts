export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  image: string
  company?: { title: string }
  address?: { city: string; state: string }
}

export type UsersResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}
