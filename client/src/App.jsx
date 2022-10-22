import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import { RequireAuth } from './components/RequireAuth'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path="profile">
          <Route 
            index 
            element={
              <RequireAuth>
                <></>
              </RequireAuth>
            }/>
          <Route path=":userId" element={<></>}/>
        </Route>
        <Route path="*" element={<h1>Nada por aqui 😜</h1>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
