import { useEffect, useState } from 'react'
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
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const root = window.document.documentElement

  let navigate = useNavigate()

  useEffect(() => {
    root.setAttribute('class', darkMode ? 'dark' : 'light')
  }, [darkMode])
  return (
    <AppContext value={{ navigate, boards, setBoards, darkMode, setDarkMode, filter, setFilter, searchTerm, setSearchTerm, isBoardModalOpen, setIsBoardModalOpen}}>
      <div>
          <NavBar />
          <HomeBoardsContainer />
      </div>
    </AppContext>
  )
}

export default App
