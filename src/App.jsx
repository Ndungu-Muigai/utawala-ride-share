import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './Pages/Home/Page'
import AuthPage from './Pages/Auth/Page'

function App() 
{
  return (
    <div className="min-h-screen bg-white text-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path='*' element={<>Not Found you fool!</>} />
      </Routes>
    </div>
  )
}

export default App