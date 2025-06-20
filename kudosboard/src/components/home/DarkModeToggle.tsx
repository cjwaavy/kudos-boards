import { useContext } from "react"
import { AppContext } from "../../AppContext"
import { BoardContext } from "../boards/BoardContext"

const DarkModeToggle = () => {

  const {darkMode, setDarkMode} = useContext(AppContext) ? useContext(AppContext) : useContext(BoardContext)
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
  }
  return (
    <button className={`absolute top-0 right-4 opacity-90 dark:!bg-gray-100 !bg-slate-900 dark:!text-black z-50`} onClick={handleDarkModeToggle}>
        {darkMode ? 'Light Mode 🌞' : 'Dark Mode 🌚'}
    </button>
  )
}

export default DarkModeToggle
