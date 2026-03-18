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
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
          <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-slate-900">
              Something broke.
            </h1>
            <p className="mt-2 text-sm text-slate-600">
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
