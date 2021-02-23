import { useState } from "react";

const SearchBar = (props) => {
  const {onMovieSelect, item} = props
  const [searchTerm, setSearchTerm] = useState("");
  
  const searching = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    onMovieSelect(searchTerm)
    event.preventDefault();
  }

  return (
    <div>
     <form className="bg-white shadow-sm p-4 flex" onSubmit={handleSubmit}>
        <input className="w-full rounded p-2" type="text" placeholder="Search Movies" onChange={searching} />
        <button type="submit" className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4">
          <p className="font-semibold text-xs">Search</p>
        </button>
    </form>
    {searchTerm !== "" ? (
      <div className="autocomplete bg-white p-4 border-t">  
        <ul>
        {item
          .filter((val) => {
            if (searchTerm == "") {
              return null;
            } else if (
              val.title.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((data) => (
            <li key={data.id}>{data.title}</li>
        ))}
        </ul>
      </div>
      ) : (null)}
    </div>
  )
}

export default SearchBar