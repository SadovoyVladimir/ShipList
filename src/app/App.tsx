import React from 'react'
import { ToastContainer } from 'react-toastify'
import MainPage from './components/page/MainPage'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'

function App() {
  return (
    <>
      <div className='container'>
        <MainPage />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
