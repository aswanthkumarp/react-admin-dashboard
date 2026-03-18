import {
  Building2,
  CreditCard,
  Globe,
  MapPin,
  Phone,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import type { User } from './types'

export type UserDetailSection = {
  title: string
  icon: LucideIcon
  rows: Array<{ label: string; value: string }>
}

const asText = (value: unknown) =>
  value === undefined || value === null || value === '' ? '-' : String(value)

export function buildUserDetailSections(user: User): UserDetailSection[] {
  return [
    {
      title: 'Personal',
      icon: UserRound,
      rows: [
        { label: 'Age', value: asText(user.age) },
        { label: 'Gender', value: asText(user.gender) },
        { label: 'Username', value: asText(user.username) },
        { label: 'Blood Group', value: asText(user.bloodGroup) },
        { label: 'Eye Color', value: asText(user.eyeColor) },
      ],
    },
    {
      title: 'Contact',
      icon: Phone,
      rows: [
        { label: 'Email', value: asText(user.email) },
        { label: 'Phone', value: asText(user.phone) },
        { label: 'IP', value: asText(user.ip) },
        { label: 'University', value: asText(user.university) },
        { label: 'Birth Date', value: asText(user.birthDate) },
      ],
    },
    {
      title: 'Address',
      icon: MapPin,
      rows: [
        { label: 'Street', value: asText(user.address?.address) },
        { label: 'City', value: asText(user.address?.city) },
        { label: 'State', value: asText(user.address?.state) },
        { label: 'Postal Code', value: asText(user.address?.postalCode) },
        { label: 'Country', value: asText(user.address?.country) },
      ],
    },
    {
      title: 'Company',
      icon: Building2,
      rows: [
        { label: 'Name', value: asText(user.company?.name) },
        { label: 'Department', value: asText(user.company?.department) },
        { label: 'Title', value: asText(user.company?.title) },
        { label: 'City', value: asText(user.company?.address?.city) },
        { label: 'Country', value: asText(user.company?.address?.country) },
      ],
    },
    {
      title: 'Banking',
      icon: CreditCard,
      rows: [
        { label: 'Card Type', value: asText(user.bank?.cardType) },
        { label: 'Card Number', value: asText(user.bank?.cardNumber) },
        { label: 'Currency', value: asText(user.bank?.currency) },
        { label: 'IBAN', value: asText(user.bank?.iban) },
        { label: 'Expire', value: asText(user.bank?.cardExpire) },
      ],
    },
    {
      title: 'Body Metrics',
      icon: Globe,
      rows: [
        { label: 'Height', value: asText(user.height) },
        { label: 'Weight', value: asText(user.weight) },
        {
          label: 'Hair',
          value: asText(user.hair ? `${user.hair.color} / ${user.hair.type}` : '-'),
        },
        { label: 'MAC', value: asText(user.macAddress) },
        { label: 'Maiden Name', value: asText(user.maidenName) },
      ],
    },
  ]
}
