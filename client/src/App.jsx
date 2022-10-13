import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        
      </Route>
      <Route path="*" element={<h1>Nada por aqui 😜</h1>} />
    </Routes>
  )
}

export default App
