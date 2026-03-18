import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from '../../app/use-theme'
import { Button } from '../ui/button'

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme()

  return (
    <Button variant="outline" className="gap-2" onClick={toggleMode}>
      {mode === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </Button>
  )
}
