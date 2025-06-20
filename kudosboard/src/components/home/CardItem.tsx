import { useContext, useState } from "react";
import { deleteCard, upvoteCard } from "../../utils/fetchRequests";
import { BoardContext } from "../boards/BoardContext";
import CardDetailsModal from "../boards/CardDetailsModal";

interface Card {
  id: string;
  gifUrl: string;
  title: string;
  author: string;
  upvotes: number;
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
      return console.log("Error deleting card");
    }
    removeCard();
  };

  const handleUpvoteCard = async () => {
    const updatedCard = await upvoteCard(id, parseInt(card.id));
    if (updatedCard) {
      setCards(cards.map((c: { id: string; }) => parseInt(c.id) === parseInt(card.id) ? updatedCard : c));
    } else {
      console.log("Error upvoting card");
    }
  };

  return (
    <>
      <div
        className='flex flex-col items-center w-68 p-1 hover:scale-105 transition-transform cursor-pointer'
        key={card.id}
        onClick={handleOpenModal}
      >
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
