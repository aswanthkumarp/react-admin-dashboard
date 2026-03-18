import { useCallback, useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { ThemeToggle } from '../components/theme/theme-toggle'
import { UsersToolbar } from '../features/users/components/users-toolbar'
import { UsersTable } from '../features/users/components/users-table'
import { UsersTableSkeleton } from '../features/users/components/users-table-skeleton'
import { UserDetailDialog } from '../features/users/components/user-detail-dialog'
import { useUsersQuery } from '../features/users/hooks/use-users-query'
import type { User, UserSort, UserSortField } from '../features/users/types'
import { useDebounce } from '../hooks/use-debounce'
import { PAGE_SIZE } from '../lib/api/users'
import { Button } from '../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card'

export default function DashboardPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<UserSort>({ field: 'firstName', order: 'asc' })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const debouncedSearch = useDebounce(search.trim(), 450)

  const { data, isLoading, isFetching, isError, error, refetch } = useUsersQuery(
    page,
    debouncedSearch,
    sort,
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE)),
    [data?.total],
  )

  const handleSortChange = useCallback((field: UserSortField) => {
    setSort((current) =>
      current.field === field
        ? { field, order: current.order === 'asc' ? 'desc' : 'asc' }
        : { field, order: 'asc' },
    )
    setPage(1)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 px-4 py-8">
      <Card className="mx-auto max-w-6xl border-border/70 bg-card/95 backdrop-blur-sm">
        <CardHeader className="space-y-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle>User Management Dashboard</CardTitle>
              <CardDescription>
                Search, review, and manage users with a paginated data view.
              </CardDescription>
            </div>
            <ThemeToggle />
          </div>
          <UsersToolbar
            search={search}
            total={data?.total ?? 0}
            isFetching={isFetching}
            onSearchChange={(value) => {
              setSearch(value)
              setPage(1)
            }}
          />
        </CardHeader>
        <CardContent>
          {isLoading && <UsersTableSkeleton />}
          {isError && (
            <div className="flex flex-col items-center gap-3 rounded-md border border-destructive/35 bg-destructive/10 px-4 py-8 text-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">{error.message}</p>
              <Button variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}
          {!isLoading && !isError && (data?.users.length ?? 0) === 0 && (
            <p className="rounded-md border border-border p-8 text-center text-sm text-muted-foreground">
              No users matched your search.
            </p>
          )}
          {!isLoading && !isError && (data?.users.length ?? 0) > 0 && (
            <>
              <UsersTable
                users={data?.users ?? []}
                sort={sort}
                onSelect={setSelectedUser}
                onSortChange={handleSortChange}
              />
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <UserDetailDialog
        user={selectedUser}
        open={Boolean(selectedUser)}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />
    </main>
  )
}
