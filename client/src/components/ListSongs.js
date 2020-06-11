import React, { Fragment, useEffect, useState } from 'react';

import EditSong from "./EditSong";

const favArtist = 'Eminem'

const ListSongs = () => {

    const [songs, setSongs] = useState([]);
    const [randomSongs, setRandomSongs] = useState([]);

    //delete todo function

    const deleteSong = async id => {
        try {
        const deleteSong = await fetch(`http://localhost:5000/songs/${id}`, {
            method: "DELETE"
        });

        setSongs(songs.filter(song => song.song_id !== id));
        } catch (err) {
        console.error(err.message);
        }
    };

    const getSongs = async () => {
        try {
            const response = await fetch("http://localhost:5000/songs");
            const jsonData = await response.json();

            setSongs(jsonData);

            console.log(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const getRandomSongs = async () => {
        try {
            const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${favArtist}`, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                    "x-rapidapi-key": "990e615b04mshb35f8ba764e45b3p189cd1jsne25f35f6556a"
                }
            });

            const jsonData = await response.json();

            setRandomSongs(jsonData.data);

            console.log(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getSongs();
        getRandomSongs();
    }, []);

    //console.log(songs)
    return (
        <Fragment>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Genre</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map(song => (
                        <tr key={song.song_id}>
                            <td>{song.name}</td>
                            <td>{song.artist}</td>
                            <td>{song.album}</td>
                            <td>{song.type}</td>
                            <td><EditSong song={song}></EditSong></td>
                            <td>
                                <button className="btn btn-danger"onClick={() => deleteSong(song.song_id)}>
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <h2>Favorite Artist : {favArtist}</h2>
            <h4>Songs</h4>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                    </tr>
                </thead>
                <tbody>
                    {randomSongs.map(randomSong => (
                        <tr key={randomSong.id}>
                            <td>{randomSong.title}</td>
                            <td>{randomSong.artist.name}</td>
                            <td>{randomSong.album.title}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>

            {<div>
            </div>}

        </Fragment>
    )
};

export default ListSongs;