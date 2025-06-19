import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/home/NavBar'
import HomeBoardsContainer from './HomeBoardsContainer'
import { AppContext } from './AppContext'
import { useNavigate } from "react-router";

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [boards, setBoards] = useState()
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const root = window.document.documentElement

  let navigate = useNavigate()

  useEffect(() => {
    root.setAttribute('class', darkMode ? 'dark' : 'light')
  }, [darkMode])
  return (
    <AppContext value={{ navigate, boards, setBoards, darkMode, setDarkMode, filter, setFilter, searchTerm, setSearchTerm}}>
      <div>
          <NavBar />
          <HomeBoardsContainer />
      </div>
    </AppContext>
  )
}

export default App
