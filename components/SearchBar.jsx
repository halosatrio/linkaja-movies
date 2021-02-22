const SearchBar = () => {
  return (
     <div className="bg-white shadow-sm p-4 flex mb-10">
        <input className="w-full rounded p-2" type="text" placeholder="Search Movies" />
        <button className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
                <p className="font-semibold text-xs">Search</p>
        </button>
    </div>
  )
}

export default SearchBar
