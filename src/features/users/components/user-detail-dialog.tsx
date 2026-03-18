import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog'
import type { User } from '../types'

type UserDetailDialogProps = {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailDialog({
  user,
  open,
  onOpenChange,
}: UserDetailDialogProps) {
  if (!user) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {user.firstName} {user.lastName}
          </DialogTitle>
          <DialogDescription>
            {user.company?.title ?? 'Individual Contributor'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 rounded-lg border border-slate-200 p-4 text-sm">
          <p>
            <span className="font-semibold text-slate-900">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Age:</span> {user.age}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Location:</span>{' '}
            {user.address?.city ?? '-'}, {user.address?.state ?? '-'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
