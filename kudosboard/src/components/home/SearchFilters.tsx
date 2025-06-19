const SearchFilters = () => {
    return (
        <div className="flex gap-1 justify-center m-1 mb-2">
            <button className="!bg-gray-300 !text-black">
                <p>All</p>
            </button>
            <button className="!bg-gray-300 !text-black">
                <p>Recent</p>
            </button>
            <button className="!bg-gray-300 !text-black">
                <p>Celebration</p>
            </button>
            <button className="!bg-gray-300 !text-black">
                <p>Thank You</p>
            </button>
            <button className="!bg-gray-300 !text-black">
                <p>Inspiration</p>
            </button>
        </div>
    )
}

export default SearchFilters
