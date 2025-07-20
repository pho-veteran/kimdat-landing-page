import { BrowserRouter as Router } from 'react-router'
import AppRoutes from './routes'
import { Header } from './components/ui/header'

function App() {
  return (
    <>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </>
  )
}

export default App
