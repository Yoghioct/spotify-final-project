import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Song from "./components/Song";
import url from "./config/config";
import AddPlaylist from "./components/Playlist";
import Search from "./components/Search";
import "./App.css";
// import data from "./sample-data";

function App() {
  const [token, setToken] = useState("");
  const [searchSong, setSearchSong] = useState("");
  const [songData, setSongData] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [combineSongs, setCombineSongs] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");
    const getUserId = () => {
      axios
        .get(`https://api.spotify.com/v1/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserId(response.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUserId();
    setToken(accessToken);
  }, []);

  useEffect(() => {
    const handleCombineTracks = songData.map((song) => ({
      ...song,
      isSelected: selectedSongs.find((data) => data === song.uri),
    }));
    setCombineSongs(handleCombineTracks);
  }, [songData, selectedSongs]);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  const getSong = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchSong}&type=track&access_token=${token}`
      )
      .then((response) => {
        setSongData(response.data.tracks.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelect = (uri) => {
    const selected = selectedSongs.find((song) => song === uri);
    selected
      ? setSelectedSongs(selectedSongs.filter((song) => song !== uri))
      : setSelectedSongs([...selectedSongs, uri]);
  };

  return (
    <div>
      {!token ? (
        <a href={url}>
          <button className="loginbtn">Login</button>
        </a>
      ) : (
        <button className="loginbtn" onClick={logout}>
          Logout
        </button>
      )}

      {token ? (
        <>
          <h3 align="center">Create Playlist</h3>
          <div>
            <AddPlaylist
              token={token}
              userId={userId}
              songUris={selectedSongs}
            />
          </div>
          <h3 align="center">Search Playlist</h3>
          <Search getSong={getSong} setSearchSong={setSearchSong} />
        </>
      ) : (
        <div></div>
      )}

      <div className="">
        {combineSongs.map((song) => {
          const { uri, name, artists, album, isSelected } = song;
          return (
            <Song
              key={uri}
              uri={uri}
              image={album.images[0]?.url}
              title={name}
              album={artists[0]?.name}
              selectState={handleSelect}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
