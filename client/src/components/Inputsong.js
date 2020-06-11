import React, { Fragment, useState } from "react";

const InputSong = () => {

    const [name, setName] = useState(""); 
    const [artist, setArtist] = useState(""); 
    const [album, setAlbum] = useState(""); 
    const [type, setType] = useState(""); 

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { name, artist, album, type};
            const response = await fetch("http://localhost:5000/songs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
            console.log(response);
        } catch(err) {
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className="text-center mt-5">My Playlist</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <label>Title
                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                </label>
                <label>Artist
                <input type="text" className="form-control" value={artist} onChange={e => setArtist(e.target.value)}/>
                </label>
                <label>Album
                <input type="text" className="form-control" value={album} onChange={e => setAlbum(e.target.value)}/>
                </label>
                <label>Genre
                <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value)}/>
                </label>
                <button className="btn btn-succes">Add</button>
            </form>
        </Fragment>
    )
};

export default InputSong;