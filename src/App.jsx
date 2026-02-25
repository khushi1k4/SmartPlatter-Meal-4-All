import './App.css'
import { Route, Routes, Outlet, useLocation } from 'react-router-dom'
import { LanguageProvider } from "./context/LanguageContext"; // ✅ import provider
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Scanner from './pages/Scanner' 
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function Layout() {
  const location = useLocation()
  const is404 = location.pathname === '/404' || location.pathname === '*'

  return (
    <>
      <NavBar />
      <Outlet />
      {!is404 && <Footer />}
    </>
  )
}

function App() {
  return (
    // ✅ Wrap Routes with LanguageProvider
    <LanguageProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='scanner' element={<Scanner />} />
        </Route>
        <Route path='*' element={<NoPage />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App