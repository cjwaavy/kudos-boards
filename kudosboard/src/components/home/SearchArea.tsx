import { useState } from "react"
import SearchBar from "./SearchBar"
import SearchFilters from "./SearchFilters"

const SearchArea = () =>{

    return (
        <div>
            <SearchBar />
            <SearchFilters />
            <CreateButton />
        </div>
    )
}

export default SearchArea
