import { useContext } from "react";
import { deleteBoard } from "../../utils/fetchRequests";
import { AppContext } from "../../AppContext";

interface Board {
  id: string;
  coverImg: string;
  title: string;
  author: string;
}

const BoardItem = ({ board }: { board: Board }) => {
    const {navigate, boards, setBoards} = useContext(AppContext)
    const removeBoard = () => setBoards(boards.filter( (b: { id: string; }) => parseInt(b.id) !== parseInt(board.id) ))
    const handleDeleteBoard = async (event: React.MouseEvent) => {
      event.stopPropagation()
        if( ! await deleteBoard(parseInt(board.id))) {
            return console.log("Error deleting board");
        }
        removeBoard()
    }
    const handleViewBoard = () => {
      navigate(`/boards/${board.id}`);
  };
  return (
    <div className='flex flex-col items-center w-68 p-1 hover:scale-105 transition-transform hover:cursor-pointer' key={board.id} onClick={handleViewBoard}>
      <img className='overflow-clip w-44 h-80' src={board.coverImg} alt={board.title} />
      <p className='py-1 font-bold'>{board.title}</p>
      <p>{board.author}</p>
      <div className="flex flex-row gap-10 justify-evenly py-1">
        <button className='!bg-gray-100 dark:!bg-slate-800 dark:!text-white !text-black underline' onClick={handleViewBoard}>
          View Board
        </button>
        <button className='!bg-teal-800' onClick={(event) => handleDeleteBoard(event)}>
          Delete Board
        </button>
      </div>
    </div>
  );
};

export default BoardItem;
