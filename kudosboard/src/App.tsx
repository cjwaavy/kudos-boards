import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/home/NavBar'
import HomeBoardsContainer from './HomeBoardsContainer'
import Footer from './components/home/Footer'
import { AppContext } from './AppContext'
import { useNavigate } from "react-router";

function App() {
  const root = window.document.documentElement

  const [darkMode, setDarkMode] = useState(root.getAttribute('class') === 'dark')
  const [boards, setBoards] = useState()
  const [filter, setFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);


  let navigate = useNavigate()

  useEffect(() => {
    root.setAttribute('class', darkMode ? 'dark' : 'light')
  }, [darkMode])
  return (
    <AppContext value={{ navigate, boards, setBoards, darkMode, setDarkMode, filter, setFilter, searchTerm, setSearchTerm, isBoardModalOpen, setIsBoardModalOpen}}>
      <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex-grow">
            <HomeBoardsContainer />
          </div>
          <Footer />
      </div>
    </AppContext>
  )
}

export default App
