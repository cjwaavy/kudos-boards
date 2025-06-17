import { useState } from "react"
import SearchBar from "./SearchBar"
import SearchFilters from "./SearchFilters"

interface SearchAreaProps {

}
const SearchArea: React.FC<SearchAreaProps> = () =>{

    return (
        <div>
            <SearchBar />
            <SearchFilters />
        </div>
    )
}

export default SearchArea
