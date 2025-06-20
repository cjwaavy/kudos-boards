import { useNavigate, useParams } from "react-router";
import { BoardContext } from "./components/boards/BoardContext";
import BoardPageNavbar from "./components/boards/BoardPageNavbar";
import { useEffect, useState } from "react";
import BoardPageCardsContainer from "./components/home/BoardPageCardsContainer";
import Footer from "./components/home/Footer";


const BoardPage = () => {

    let navigate = useNavigate()
    const root = window.document.documentElement

    const [darkMode, setDarkMode] = useState(root.getAttribute('class') === 'dark')
    const [cards, setCards] = useState([]);
    const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        root.setAttribute('class', darkMode ? 'dark' : 'light')
    }, [darkMode])

    return (
        <BoardContext value={{ id, navigate, darkMode, setDarkMode, cards, setCards, isCreateCardModalOpen, setIsCreateCardModalOpen }}>
            <div className="flex flex-col min-h-screen">
                <BoardPageNavbar />
                <div className="flex-grow">
                    <BoardPageCardsContainer />
                </div>
                <Footer />
            </div>
        </BoardContext>
    );
};

export default BoardPage;
