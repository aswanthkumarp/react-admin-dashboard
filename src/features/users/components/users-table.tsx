import { memo } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, ArrowUpRight, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'
import type { User, UserSort, UserSortField } from '../types'

type UsersTableProps = {
  users: User[]
  sort: UserSort
  onSelect: (user: User) => void
  onSortChange: (field: UserSortField) => void
}

function SortIcon({ active, order }: { active: boolean; order: UserSort['order'] }) {
  if (!active) {
    return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
  }
  return order === 'asc' ? (
    <ArrowUp className="h-3.5 w-3.5 text-primary" />
  ) : (
    <ArrowDown className="h-3.5 w-3.5 text-primary" />
  )
}

function SortHeader({
  label,
  field,
  sort,
  onSortChange,
  className,
}: {
  label: string
  field: UserSortField
  sort: UserSort
  onSortChange: (field: UserSortField) => void
  className?: string
}) {
  const active = sort.field === field

  return (
    <TableHead className={className}>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 font-semibold text-foreground"
        onClick={() => onSortChange(field)}
      >
        {label}
        <SortIcon active={active} order={sort.order} />
      </button>
    </TableHead>
  )
}

function UsersTableComponent({ users, sort, onSelect, onSortChange }: UsersTableProps) {
  const navigate = useNavigate()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <SortHeader label="Name" field="firstName" sort={sort} onSortChange={onSortChange} />
          <SortHeader label="Email" field="email" sort={sort} onSortChange={onSortChange} />
          <SortHeader
            label="Phone"
            field="phone"
            sort={sort}
            onSortChange={onSortChange}
            className="hidden sm:table-cell"
          />
          <TableHead className="w-[110px] text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-semibold">
              <div className="flex items-center gap-3">
                <img
                  src={user.image}
                  alt={`${user.firstName} avatar`}
                  className="h-9 w-9 rounded-full border border-border object-cover"
                />
                <span>
                  {user.firstName} {user.lastName}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell className="hidden text-muted-foreground sm:table-cell">
              {user.phone}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="sm" variant="secondary" onClick={() => onSelect(user)}>
                  <Eye className="mr-1 h-4 w-4" />
                  Quick view
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate(`/user/${user.id}`)}>
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  Open
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const UsersTable = memo(UsersTableComponent)
