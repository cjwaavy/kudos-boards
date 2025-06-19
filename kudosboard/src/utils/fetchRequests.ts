// import process from "process";
const serverUrl = import.meta.env.VITE_API_URL

const getBoards = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/boards`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.error("Error fetching boards: ", err);
        return null;
    }
};

const createBoard = async (boardData: {
    title: string;
    category: string;
    coverImg: string;
    author?: string | null;
}) => {
    try {
        const response = await fetch(`${serverUrl}/api/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(boardData),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error creating board: ", err);
        return null;
    }
};

const deleteBoard = async (boardId: number) => {
    try {
        const response = await fetch(`${serverUrl}/api/boards/${boardId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (err) {
        console.error("Error deleting board: ", err);
        return null;
    }
};

const getCards = async (boardId: number) => {
    try {
        const response = await fetch(`${serverUrl}/api/boards/${boardId}/cards`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching cards for board ${boardId}: `, err);
        return null;
    }
};

export { getBoards, createBoard, deleteBoard, getCards };
