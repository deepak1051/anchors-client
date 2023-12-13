import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VideoDetail from './pages/VideoDetail'
import Header from './components/Header'

function App() {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<VideoDetail />} path="/:id" />

      </Routes>
    </BrowserRouter>
  )
}

export default App
