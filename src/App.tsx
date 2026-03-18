import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Spinner } from './components/ui/spinner'

const DashboardPage = lazy(() => import('./pages/dashboard-page'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
