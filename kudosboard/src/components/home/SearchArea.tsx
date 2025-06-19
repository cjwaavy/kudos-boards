import { use, useContext, useState } from "react"
import SearchBar from "./SearchBar"
import SearchFilters from "./SearchFilters"
import CreateButton from "./CreateButton"
import { AppContext } from "../../AppContext"

const SearchArea = () =>{
    return (
        <div className="flex-col">
            <SearchBar />
            <SearchFilters />
            <CreateButton />
        </div>
    )
}

export default SearchArea
