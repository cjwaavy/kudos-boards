import { useContext, useEffect } from "react"
import { AppContext } from "./AppContext"
import { getBoards } from "./fetchRequests"

const HomeBoardsContainer = () => {
    const { boards, setBoards } = useContext(AppContext)
    useEffect(() =>{
        getBoards().then((boards) => {
            setBoards(boards)
        })
    }, [])

    useEffect(() => {
        console.log(boards)
    }, [boards])

    if(!boards){
        return(
            <div>
                Loading...
            </div>
        )
    }
    if(boards.length === 0){
        return(
            <div>
                No boards found
            </div>
        )
    }
    return(
        <div className='flex flex-row flex-wrap justify-around mt-5 gap-5'>
            {boards.map((board: any) => {
                return(
                    <div className=' flex flex-col items-center w-68 p-1 hover:scale-105 transition-transform' key={board.id}>
                        <img className='overflow-clip w-44 h-80' src={board.coverImg} />
                        <p className=' py-1 font-bold'>{board.title}</p>
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
                )
            })}
        </div>
    )
}

export default HomeBoardsContainer
