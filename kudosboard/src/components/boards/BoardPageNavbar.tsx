import { useContext } from "react";
import { BoardContext } from "./BoardContext";
import DarkModeToggle from "../home/DarkModeToggle";
import BackButton from "./BackButton";
import CreateCardButton from "../../CreateCardButton";

const BoardPageNavbar: React.FC = () => {
  const { darkMode } = useContext(BoardContext)
  return (
        <div className="relative">
            <BackButton />
            <DarkModeToggle />
            <img src={darkMode ? '/kudoboard_logo_dark_mode.png' : '/kudoboard_logo.png'} className="w-25 place-self-center"/>
            <h1 className="my-5"></h1>
            <CreateCardButton />
        </div>
  );
};

export default BoardPageNavbar;
