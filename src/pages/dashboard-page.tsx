import { useMemo, useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { UsersToolbar } from '../features/users/components/users-toolbar'
import { UsersTable } from '../features/users/components/users-table'
import { UserDetailDialog } from '../features/users/components/user-detail-dialog'
import { useUsersQuery } from '../features/users/hooks/use-users-query'
import type { User } from '../features/users/types'
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
import { Skeleton } from '../components/ui/skeleton'

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-11 w-full" />
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const debouncedSearch = useDebounce(search.trim(), 450)

  const { data, isLoading, isFetching, isError, error, refetch } = useUsersQuery(
    page,
    debouncedSearch,
  )

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE)),
    [data?.total],
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/50 to-slate-100 px-4 py-8">
      <Card className="mx-auto max-w-6xl border-slate-200/80">
        <CardHeader className="space-y-2">
          <CardTitle>User Management Dashboard</CardTitle>
          <CardDescription>
            Search, review, and manage users with a paginated data view.
          </CardDescription>
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
          {isLoading && <TableSkeleton />}
          {isError && (
            <div className="flex flex-col items-center gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-8 text-center">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-700">{error.message}</p>
              <Button variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
            </div>
          )}
          {!isLoading && !isError && (data?.users.length ?? 0) === 0 && (
            <p className="rounded-md border border-slate-200 p-8 text-center text-sm text-slate-500">
              No users matched your search.
            </p>
          )}
          {!isLoading && !isError && (data?.users.length ?? 0) > 0 && (
            <>
              <UsersTable users={data?.users ?? []} onSelect={setSelectedUser} />
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Previous
                </Button>
                <span className="text-sm text-slate-600">
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
