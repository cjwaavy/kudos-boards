import { useContext } from "react";
import { BoardContext } from "./components/boards/BoardContext";

const CreateCardButton = () => {
    const {setIsCreateCardModalOpen} = useContext(BoardContext)

    return (
        <button
            className="!bg-teal-600 !text-white px-4 py-2 rounded-lg hover:!bg-teal-700 transition-colors"
            onClick={() => setIsCreateCardModalOpen(true)}
        >
            Create a New Card
        </button>
    );
};

export default CreateCardButton;
