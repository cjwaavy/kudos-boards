import { useContext } from "react";
import { BoardContext } from "./BoardContext";
import DarkModeToggle from "../home/DarkModeToggle";
import BackButton from "./BackButton";

const BoardPageNavbar: React.FC = () => {

  return (
        <div className="relative">
            <BackButton />
            <DarkModeToggle />
        </div>
  );
};

export default BoardPageNavbar;
