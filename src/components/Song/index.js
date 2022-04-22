const Song = ({ uri, image, title, album, selectState, isSelected }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={image} alt="Album" />
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{album}</p>
        <button
          className="btn"
          onClick={() => {
            selectState(uri);
          }}
        >
          {isSelected ? "Unselect" : "Select"}
        </button>
      </div>
    </div>
  );
};

export default Song;