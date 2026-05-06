import { Route, Routes } from 'react-router-dom'
import './App.css'

import HomePage from './Pages/Home/Page'

function App() 
{
  return (
    <div className="min-h-screen bg-white text-black">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App

