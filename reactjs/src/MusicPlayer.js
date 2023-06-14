import React, { useState, useRef } from 'react';
import './Style.css';

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const audioRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newPlaylist = [...playlist];
    for (let i = 0; i < files.length; i++) {
      newPlaylist.push(files[i]);
    }
    setPlaylist(newPlaylist);
  };

  const handleDelete = (index) => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
    if (index === playingIndex) {
      setPlayingIndex(-1);
      audioRef.current.pause();
    } else if (index < playingIndex) {
      setPlayingIndex(playingIndex - 1);
    }
  };

  const handlePlay = (index) => {
    if (index === playingIndex) {
      audioRef.current.pause();
      setPlayingIndex(-1);
    } else {
      audioRef.current.src = URL.createObjectURL(playlist[index]);
      audioRef.current.play();
      setPlayingIndex(index);
    }
  };

  return (
    <div className="music-player">
      <h2>Music Player</h2>
      <div className="file-input">
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <ul className="playlist">
        {playlist.map((file, index) => (
          <li key={index} className="playlist-item">
            {file.name}
            <button onClick={() => handlePlay(index)}>{playingIndex === index ? 'Pause' : 'Play'}</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <audio ref={audioRef} />
    </div>
  );
};

export default MusicPlayer;
