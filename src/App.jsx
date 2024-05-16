import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import SideMenu from './Components/SideMenu'
import PageContent from './Components/PageContent'
import Footer from './Components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Header/>
        <div className='flex'>
          <div className='h-[83vh]'>
            <SideMenu/>
          </div>
          <div className='bg-gray-300 w-full'>
            <PageContent/>
          </div>
          
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default App
