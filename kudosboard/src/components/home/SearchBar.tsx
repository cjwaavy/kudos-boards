import { useContext, useState } from "react";
import { AppContext } from "../../AppContext";

const SearchBar = () => {
    const { searchTerm, setSearchTerm } = useContext(AppContext);

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="flex items-center justify-center flex-row gap-1.5 mt-2">
            <input
                placeholder="Search boards..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button className="h-10 !bg-teal-800">
                <p>Search</p>
            </button>
            <button className="h-10 !bg-teal-800" onClick={handleClear}>
                <p>Clear</p>
            </button>
        </div>
    );
};

export default SearchBar;
