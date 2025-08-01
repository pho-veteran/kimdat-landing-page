import { BrowserRouter as Router } from 'react-router'
import AppRoutes from './routes'
import AppLayout from './layouts/app-layout'

function App() {
  return (
    <>
      <Router>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </>
  )
}

export default App
