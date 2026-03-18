import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '../components/ui/button'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ui] app crashed', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background p-6">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-foreground">
              Something broke.
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please reload the app to continue.
            </p>
            <Button className="mt-5" onClick={() => window.location.reload()}>
              Reload
            </Button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
