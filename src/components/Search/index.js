const Search = ({ setSearchSong, getSong }) => {
  return (
    <div className="searchform">
      <input
        type="text"
        name="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => setSearchSong(e.target.value)}
      />
      <button type="submit" className="submitbtn" onClick={getSong}>
        Search
      </button>
    </div>
  );
};

export default Search;
