import { useState } from "react";

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState("");
    return (
        <div className="flex items-center justify-center flex-row gap-1.5 mt-2">
                <input placeholder="Search boards..." onChange={(event) => setSearchTerm(event.target.value)} />
                <button className="h-10 !bg-teal-800 dark:!bg-amber-300 ">
                    <p>
                        Search
                    </p>
                </button>
                <button className="h-10 !bg-teal-800">
                    <p>
                        Clear
                    </p>
                </button>
            </div>
    )
}

export default SearchBar
