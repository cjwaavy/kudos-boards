import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/home/NavBar'
import HomeBoardsContainer from './HomeBoardsContainer'
import { AppContext } from './AppContext'

function App() {
  const [count, setCount] = useState(0)
  const [boards, setBoards] = useState()
  // const root = window.document.documentElement
  // root.setAttribute('class', 'dark')

  // console.log(root)
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
