import { memo } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import type { User } from '../types'

type UsersTableProps = {
  users: User[]
  onSelect: (user: User) => void
}

function UsersTableComponent({ users, onSelect }: UsersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="hidden sm:table-cell">Phone</TableHead>
          <TableHead className="w-[110px] text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-semibold text-slate-900">
              {user.firstName} {user.lastName}
            </TableCell>
            <TableCell className="text-slate-600">{user.email}</TableCell>
            <TableCell className="hidden text-slate-600 sm:table-cell">
              {user.phone}
            </TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="secondary" onClick={() => onSelect(user)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const UsersTable = memo(UsersTableComponent)
