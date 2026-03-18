import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'

type UserDetailCardProps = {
  title: string
  icon: LucideIcon
  rows: Array<{ label: string; value: string }>
}

export function UserDetailCard({ title, icon: Icon, rows }: UserDetailCardProps) {
  return (
    <Card className="border-border/70">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {rows.map((row) => (
          <p key={row.label} className="flex justify-between gap-3">
            <span className="text-muted-foreground">{row.label}</span>
            <span className="text-right font-semibold">{row.value}</span>
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
