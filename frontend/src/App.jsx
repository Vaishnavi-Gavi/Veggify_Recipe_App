import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/Footer'
function App() {
  const [notice, setNotice] = useState('')
  useEffect(() => {
    const msg = sessionStorage.getItem('notice') || ''
    if (msg) {
      setNotice(msg)
      sessionStorage.removeItem('notice')
      const t = setTimeout(() => setNotice(''), 2000)
      return () => clearTimeout(t)
    }
  }, [])
  return (
    <div className='max-w-screen-2xl mx-auto'>
      {notice && (
        <div className='w-full bg-green-50 border-b border-green-200 text-green-700 py-3 px-4 text-sm flex items-center justify-between gap-4'>
          <div className='flex-1 text-center'>{notice}</div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setNotice('')}
              className='px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition'
            >
              OK
            </button>
            <button
              onClick={() => setNotice('')}
              className='px-3 py-1 rounded-md border border-green-400 text-green-700 hover:bg-green-100 transition'
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Header/>
      <div className='min-h-[calc(100vh-136px)]'>
         <Outlet/>
      </div>
      <Footer/>

    </div>
  )
}

export default App
