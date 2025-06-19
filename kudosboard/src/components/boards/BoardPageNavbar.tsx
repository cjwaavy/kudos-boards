import { useContext } from "react";
import { BoardContext } from "./BoardContext";
import DarkModeToggle from "../home/DarkModeToggle";
import BackButton from "./BackButton";

const BoardPageNavbar: React.FC = () => {
  const { darkMode } = useContext(BoardContext)
  return (
        <div className="relative">
            <BackButton />
            <DarkModeToggle />
            <img src={darkMode ? '/kudoboard_logo_dark_mode.png' : '/kudoboard_logo.png'} className="w-25 place-self-center"/>
            <h1></h1>
        </div>
  );
};

export default BoardPageNavbar;
