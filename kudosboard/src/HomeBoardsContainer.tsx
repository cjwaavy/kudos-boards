import { useContext, useEffect, useState } from "react"
import { AppContext } from "./AppContext"
import { getBoards } from "./utils/fetchRequests"
import BoardItem from "./components/home/BoardItem"

const HomeBoardsContainer = () => {
    const { boards, setBoards, filter } = useContext(AppContext)

    const [displayedBoards, setDisplayedBoards] = useState(boards)

    const sortBoards = () => {
        if (!boards) return

        let sorted = [...boards]

        if (filter === 'Recent') {
            sorted.sort((boardA, boardB) => boardB.id - boardA.id)  // Assuming 'id' is a proxy for recency
        } else if (filter !== 'All') {
            sorted = sorted.filter(board => board.category === filter.toUpperCase())
        }

        setDisplayedBoards(sorted)
    }

    useEffect(() => {
        getBoards().then((boards) => {
            setBoards(boards)
            setDisplayedBoards(boards)
        })
    }, [])

    useEffect(() => {
        console.log(boards)
    }, [boards])

    useEffect(() => {
        sortBoards()
    }, [filter])

    if (!boards) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if (boards.length === 0) {
        return (
            <div>
                <div className="text-center mt-10">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Kudos Board!</h1>
                    <p className="text-lg text-gray-600">It looks like there are no boards yet. Start by creating a new board to get started!</p>
                </div>
            </div>
        )
    }
    if (displayedBoards.length === 0) {
        return (
            <div>
                No boards found
            </div>
        )
    }
    return (
        <div className='flex flex-row flex-wrap justify-around mt-5 gap-5'>
            {displayedBoards.map((board: any) => (
                <BoardItem key={board.id} board={board} />
            ))}
        </div>
    )
}

export default HomeBoardsContainer
