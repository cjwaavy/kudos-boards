import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/home/NavBar'
import HomeBoardsContainer from './HomeBoardsContainer'

function App() {
  const [count, setCount] = useState(0)

  // const root = window.document.documentElement
  // root.setAttribute('class', 'dark')

  // console.log(root)
  return (
    <div>
        <NavBar />
        <HomeBoardsContainer />
    </div>
  )
}

export default App
