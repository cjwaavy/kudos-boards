import { useContext, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { getBoards, createBoard } from "./utils/fetchRequests";
import BoardItem from "./components/home/BoardItem";
import CreateButton from "./components/home/CreateButton";
import CreateBoardModal from "./components/home/CreateBoardModal";

const HomeBoardsContainer = () => {
    const { boards, setBoards, filter, searchTerm, isBoardModalOpen, setIsBoardModalOpen} = useContext(AppContext);

    const [displayedBoards, setDisplayedBoards] = useState(boards);

    const sortBoards = () => {
        if (!boards) return

        let sorted = [...boards]

        if (filter === 'Recent') {
            sorted.sort((boardA, boardB) => boardB.id - boardA.id)
        } else if (filter !== 'All') {
            sorted = sorted.filter(board => board.category === filter.toUpperCase())
        }
        if (searchTerm && searchTerm != '') {
            sorted = sorted.filter(board =>
                board.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
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
        sortBoards()
    }, [boards])

    useEffect(() => {
        sortBoards()
    }, [filter])

    useEffect(() => {
        sortBoards()
    }, [searchTerm])

    if (!boards) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    const handleBoardCreated = async () => {
        // Refresh boards after creating a new one
        const updatedBoards = await getBoards();
        setBoards(updatedBoards);
    };

    if (boards.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mt-10">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Kudos Board!</h1>
                    <p className="text-lg text-gray-600 mb-8">It looks like there are no boards yet. Start by creating a new board to get started!</p>
                    <CreateButton/>
                </div>
                <CreateBoardModal
                    isOpen={isBoardModalOpen}
                    onClose={() => setIsBoardModalOpen(false)}
                    onBoardCreated={handleBoardCreated}
                />
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
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Kudos Boards</h1>
            </div>

            <div className='flex flex-row flex-wrap justify-around gap-5'>
                {displayedBoards.map((board: any) => (
                    <BoardItem key={board.id} board={board} />
                ))}
            </div>

            <CreateBoardModal
                isOpen={isBoardModalOpen}
                onClose={() => setIsBoardModalOpen(false)}
                onBoardCreated={handleBoardCreated}
            />
        </div>
    )
}

export default HomeBoardsContainer
