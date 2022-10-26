import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import { RequireAuth } from './components/RequireAuth'
import { AuthProvider } from './contexts/AuthContext'
import { BrickProfile } from './pages/BrickProfile'
import Home from './pages/Home'
import { Profile } from './pages/Profile'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile">
            <Route
              index
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path=":userId" element={<BrickProfile />} />
          </Route>
          <Route path="*" element={<h1>Nada por aqui 😜</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
