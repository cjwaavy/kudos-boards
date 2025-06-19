interface Board {
  id: string;
  coverImg: string;
  title: string;
  author: string;
}

const BoardItem = ({ board }: { board: Board }) => {
  return (
    <div className='flex flex-col items-center w-68 p-1 hover:scale-105 transition-transform' key={board.id}>
      <img className='overflow-clip w-44 h-80' src={board.coverImg} alt={board.title} />
      <p className='py-1 font-bold'>{board.title}</p>
      <p>{board.author}</p>
      <div className="flex flex-row gap-10 justify-evenly py-1">
        <button className='!bg-gray-100 dark:!bg-slate-800 dark:!text-white !text-black underline'>
          View Board
        </button>
        <button className='!bg-teal-800'>
          Delete Board
        </button>
      </div>
    </div>
  );
};

export default BoardItem;
