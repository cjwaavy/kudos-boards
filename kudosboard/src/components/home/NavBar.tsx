import SearchArea from "./SearchArea"

interface NavBarProps {

}
const NavBar: React.FC<NavBarProps> = () => {

    return(
        <nav className= "flex-col items-center justify-center w-full align-top">
            <img src="./kudoboard_logo.png" className="w-25 place-self-center"/>
            <SearchArea />
        </nav>
    )
}

export default NavBar
