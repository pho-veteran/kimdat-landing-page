import { type ReactNode } from 'react'
import { Header } from '@/components/ui/header'
import { Footer } from '@/components/ui/footer'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default AppLayout