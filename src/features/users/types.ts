export type Coordinates = {
  lat: number
  lng: number
}

export type Address = {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: Coordinates
  country: string
}

export type Hair = {
  color: string
  type: string
}

export type Bank = {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export type Company = {
  department: string
  name: string
  title: string
  address: Address
}

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName?: string
  gender?: string
  email: string
  phone: string
  username?: string
  password?: string
  birthDate?: string
  age: number
  image: string
  bloodGroup?: string
  height?: number
  weight?: number
  eyeColor?: string
  hair?: Hair
  ip?: string
  macAddress?: string
  university?: string
  bank?: Bank
  company?: Company
  address?: Address
}

export type UsersResponse = {
  users: User[]
  total: number
  skip: number
  limit: number
}

export type UserSortField = 'firstName' | 'email' | 'phone'

export type SortOrder = 'asc' | 'desc'

export type UserSort = {
  field: UserSortField
  order: SortOrder
}
