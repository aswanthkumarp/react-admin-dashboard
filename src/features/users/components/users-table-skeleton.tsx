import { Skeleton } from '../../../components/ui/skeleton'

export function UsersTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="grid grid-cols-4 gap-4 border-b border-border px-4 py-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="ml-auto h-4 w-14" />
      </div>
      <div className="space-y-2 p-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4 rounded-md p-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-8 w-20 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
