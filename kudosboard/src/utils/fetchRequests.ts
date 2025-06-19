// import process from "process";
const serverUrl = import.meta.env.VITE_API_URL
const getBoards = async () => {
    try{
        const response = await fetch(`${serverUrl}/api/boards`)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json()
        return data
    }
    catch (err){
        console.error("Error fetching boards: ", err)
        return null
    }
}

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

export { getBoards, deleteBoard };
