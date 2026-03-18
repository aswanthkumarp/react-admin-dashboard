import { Search } from 'lucide-react'
import { Input } from '../../../components/ui/input'

type UsersToolbarProps = {
  search: string
  total: number
  isFetching: boolean
  onSearchChange: (value: string) => void
}

export function UsersToolbar({
  search,
  total,
  isFetching,
  onSearchChange,
}: UsersToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          placeholder="Search by name, email..."
          className="pl-9"
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        {isFetching ? 'Refreshing...' : `${total} users found`}
      </p>
    </div>
  )
}
