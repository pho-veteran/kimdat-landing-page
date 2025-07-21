import { BrowserRouter as Router } from 'react-router'
import AppRoutes from './routes'
import { Header } from './components/ui/header'
import { Footer } from './components/ui/footer'

function App() {
  return (
    <>
      <Router>
        <Header />
        <AppRoutes />
        <Footer />
      </Router>
    </>
  )
}

export default App
