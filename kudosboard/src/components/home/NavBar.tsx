import { useContext } from "react"
import DarkModeToggle from "./DarkModeToggle"
import SearchArea from "./SearchArea"
import { AppContext } from "../../AppContext"

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = () => {
    const { darkMode } = useContext(AppContext)
    return(
        <nav className= "relative flex-col items-center justify-center w-full align-top">
            <img src={darkMode ? './kudoboard_logo_dark_mode.png' : './kudoboard_logo.png'} className="w-25 place-self-center"/>
            <DarkModeToggle />
            <SearchArea />
        </nav>
    )
}

export default NavBar
