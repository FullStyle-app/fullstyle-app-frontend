import { Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/NavBar'

import Homepage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ErrorPage from   './pages/ErrorPage'

import CreatorProfilePage from './pages/CreatorProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import PostDetailsPage from './pages/PostDetailsPage'
import UpdatePost from './components/UpdatePost'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LogInPage'
import Footer from './components/Footer'

function App() {
  
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/creators/:id" element={<CreatorProfilePage />} />
        <Route path="/edit-profile/:id" element={<EditProfilePage />} />
        
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/posts/:id/edit" element={<UpdatePost />} />

        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
