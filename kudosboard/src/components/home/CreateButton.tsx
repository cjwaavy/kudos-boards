import { useContext } from "react";
import { AppContext } from "../../AppContext";


const CreateButton = () => {
    const {setIsBoardModalOpen} = useContext(AppContext)

    return (
        <button
            className="!bg-teal-600 !text-white px-4 py-2 rounded-lg hover:!bg-teal-700 transition-colors"
            onClick={() => setIsBoardModalOpen(true)}
        >
            Create a New Board
        </button>
    );
};

export default CreateButton;
