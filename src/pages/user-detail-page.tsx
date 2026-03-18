import {
  AlertTriangle,
  ArrowLeft,
  Cake,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { ThemeToggle } from '../components/theme/theme-toggle'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { UserDetailCard } from '../features/users/components/user-detail-card'
import { UserDetailSkeleton } from '../features/users/components/user-detail-skeleton'
import { useUserDetailQuery } from '../features/users/hooks/use-users-query'
import { buildUserDetailSections } from '../features/users/user-detail-sections'

export default function UserDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const userId = Number(id)
  const { data: user, isLoading, isError, error, refetch } = useUserDetailQuery(userId)
  const cards = user ? buildUserDetailSections(user) : []
  const invalidId = !Number.isInteger(userId) || userId < 1

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button variant="outline" className="gap-2" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Button>
          <ThemeToggle />
        </div>

        {invalidId && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center">
            <p className="text-sm text-destructive">Invalid user id in URL.</p>
          </div>
        )}
        {isLoading && <UserDetailSkeleton />}
        {isError && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center">
            <AlertTriangle className="mx-auto mb-3 h-5 w-5 text-destructive" />
            <p className="text-sm text-destructive">{error.message}</p>
            <Button className="mt-4" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}
        {!isLoading && !isError && user && (
          <>
            <Card className="overflow-hidden border-border/70">
              <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6">
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <img
                    src={user.image}
                    alt={user.firstName}
                    className="h-20 w-20 rounded-full border-2 border-card object-cover"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {user.company?.title ?? 'No role mapped'} at{' '}
                      {user.company?.name ?? 'N/A'}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold">
                      <Cake className="h-3.5 w-3.5 text-primary" /> ID #{user.id}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <UserDetailCard
                  key={card.title}
                  title={card.title}
                  icon={card.icon}
                  rows={card.rows}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
