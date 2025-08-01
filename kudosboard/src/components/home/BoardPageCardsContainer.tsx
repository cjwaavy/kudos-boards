import { useContext, useEffect, useState } from "react";
import { getCards } from "../../utils/fetchRequests";
import CardItem from "../../components/home/CardItem";
import { BoardContext } from "../boards/BoardContext";
import CreateCardButton from "../../CreateCardButton";
import CreateCardModal from "../boards/CreateCardModal";

const HomeCardsContainer = () => {
    const { cards, setCards, id, isCreateCardModalOpen, setIsCreateCardModalOpen } = useContext(BoardContext);

    const [displayedCards, setDisplayedCards] = useState(cards);

    useEffect(() => {
        getCards(id).then((data) => {
            // Sort cards to move pinned cards to the front
            if (data) {
                const pinnedCards = data.filter((card: any) => card.pinned);
                const unpinnedCards = data.filter((card: any) => !card.pinned);
                const sortedCards = [...pinnedCards, ...unpinnedCards];
                setCards(sortedCards);
                setDisplayedCards(sortedCards);
            }
        });
    }, []);

    useEffect(() => {
        // Sort cards to move pinned cards to the front
        if (cards) {
            const pinnedCards = cards.filter((card: any) => card.pinned);
            const unpinnedCards = cards.filter((card: any) => !card.pinned);
            const sortedCards = [...pinnedCards, ...unpinnedCards];
            setDisplayedCards(sortedCards);
        }
    }, [cards]);

    if (!cards) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    const handleCardCreated = async () => {
        const updatedCards = await getCards(id);
        setCards(updatedCards);
    };

    if (cards.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mt-10">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Kudos Cards!</h1>
                    <p className="text-lg text-gray-600 mb-8">It looks like there are no cards yet. Start by creating a new card to get started!</p>
                    <CreateCardButton/>
                </div>
                <CreateCardModal
                    isOpen={isCreateCardModalOpen}
                    onClose={() => setIsCreateCardModalOpen(false)}
                    onCardCreated={handleCardCreated}
                />
            </div>
        );
    }

    if (displayedCards.length === 0) {
        return (
            <div>
                No cards found
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Cards</h1>
            </div>

            <div className='flex flex-row flex-wrap justify-around gap-5'>
                {displayedCards.map((card: any) => (
                    <CardItem key={card.id} card={card} />
                ))}
            </div>

            <CreateCardModal
                isOpen={isCreateCardModalOpen}
                onClose={() => setIsCreateCardModalOpen(false)}
                onCardCreated={handleCardCreated}
            />
        </div>
    );
};

export default HomeCardsContainer;
