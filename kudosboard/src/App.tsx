import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/home/NavBar'
import HomeBoardsContainer from './HomeBoardsContainer'
import { AppContext } from './AppContext'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [boards, setBoards] = useState()

  const root = window.document.documentElement

  useEffect(() => {
    root.setAttribute('class', darkMode ? 'dark' : 'light')
  }, [darkMode])
  return (
    <AppContext value={{boards, setBoards}}>
      <div>
          <NavBar />
          <HomeBoardsContainer />
      </div>
    </AppContext>
  )
}

export default App
