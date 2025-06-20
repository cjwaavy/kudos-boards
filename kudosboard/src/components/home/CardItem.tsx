import { useContext, useState } from "react";
import { deleteCard, upvoteCard, pinCard } from "../../utils/fetchRequests";
import { BoardContext } from "../boards/BoardContext";
import CardDetailsModal from "../boards/CardDetailsModal";

interface Card {
  id: string;
  gifUrl: string;
  title: string;
  author: string;
  upvotes: number;
  pinned: boolean;
}


const CardItem = ({ card }: { card: Card }) => {
  const { id, cards, setCards } = useContext(BoardContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const removeCard = () => setCards(cards.filter((c: { id: string }) => parseInt(c.id) !== parseInt(card.id)));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCard = async () => {
    if (!await deleteCard(id, parseInt(card.id))) {
      return ;
    }
    removeCard();
  };

  const handleUpvoteCard = async () => {
    const updatedCard = await upvoteCard(id, parseInt(card.id));
    if (updatedCard) {
      setCards(cards.map((c: { id: string; }) => parseInt(c.id) === parseInt(card.id) ? updatedCard : c));
    } else {
    }
  };

  const handlePinCard = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedCard = await pinCard(id, parseInt(card.id));
    if (updatedCard) {
      // Check if the card is being pinned or unpinned
      const isBeingPinned = updatedCard.pinned && !card.pinned;

      // Update the cards array with the updated card
      const otherCards = cards.filter((c: { id: string; }) => parseInt(c.id) !== parseInt(card.id));

      // Get existing pinned and unpinned cards
      const existingPinnedCards = otherCards.filter((c: { pinned: boolean }) => c.pinned);
      const unpinnedCards = otherCards.filter((c: { pinned: boolean }) => !c.pinned);

      if (isBeingPinned) {
        // If the card is being pinned, place it at the beginning of the pinned array
        setCards([updatedCard, ...existingPinnedCards, ...unpinnedCards]);
      } else if (updatedCard.pinned) {
        // If the card was already pinned, keep it in the pinned array (at the end)
        setCards([...existingPinnedCards, updatedCard, ...unpinnedCards]);
      } else {
        // If the card is being unpinned, place it with the unpinned cards
        setCards([...existingPinnedCards, ...unpinnedCards, updatedCard]);
      }
    } else {
      return ;
    }
  };

  return (
    <>
      <div
        className='flex flex-col items-center w-68 p-1 hover:scale-105 transition-transform cursor-pointer relative group'
        key={card.id}
        onClick={handleOpenModal}
      >
        <button
          className={`absolute top-2 right-2 bg-white dark:bg-slate-800 rounded-full p-1 z-10 ${card.pinned ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
          onClick={handlePinCard}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${card.pinned ? 'text-teal-600' : ''}`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z"
              fill={card.pinned ? "currentColor" : "#FFF"}
            />
          </svg>
        </button>
        <img
          className='overflow-clip w-44 h-80'
          src={card.gifUrl}
          alt={card.title}
        />
        <p className='py-1 font-bold'>{card.title}</p>
        <p>{card.author}</p>
        <p>Upvotes: {card.upvotes}</p>
        <div className="flex flex-row gap-10 justify-evenly py-1" onClick={(e) => e.stopPropagation()}>
          <button className='!bg-gray-100 dark:!bg-slate-800 dark:!text-white !text-black underline' onClick={handleUpvoteCard}>
            Upvote
          </button>
          <button className='!bg-teal-800' onClick={handleDeleteCard}>
            Delete Card
          </button>
        </div>
      </div>

      <CardDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        card={card}
        boardId={id}
      />
    </>
  );
};

export default CardItem;
