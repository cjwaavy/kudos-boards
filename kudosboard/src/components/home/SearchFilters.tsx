import { use, useContext } from "react";
import { AppContext } from "../../AppContext";

const SearchFilters = () => {
    const { filter, setFilter } = useContext(AppContext);
    return (
        <div className="flex gap-1 justify-center m-1 mb-2">
            <button className="!bg-gray-300 !text-black" onClick={() => setFilter('All')}>
                <p>All</p>
            </button>
            <button className="!bg-gray-300 !text-black" onClick={() => setFilter('Recent')}>
                <p>Recent</p>
            </button>
            <button className="!bg-gray-300 !text-black" onClick={() => setFilter('CELEBRATION')}>
                <p>Celebration</p>
            </button>
            <button className="!bg-gray-300 !text-black" onClick={() => setFilter('THANK_YOU')}>
                <p>Thank You</p>
            </button>
            <button className="!bg-gray-300 !text-black" onClick={() => setFilter('INSPIRATION')}>
                <p>Inspiration</p>
            </button>
        </div>
    );
}

export default SearchFilters;
