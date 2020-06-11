import React, { Fragment, useState } from "react";

 const EditSong = ({ song }) => {
   const [name, setName] = useState(song.name);
   const [artist, setArtist] = useState(song.artist);
   const [album, setAlbum] = useState(song.album);
   const [type, setType] = useState(song.type);

   //Edit Song function

   const updateDescription = async e => {
     e.preventDefault();
     try {
       const body = { name, artist, album, type};
       const response = await fetch(
         `http://localhost:5000/songs/${song.song_id}`,
         {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(body)
         }
       );

       window.location = "/";
     } catch (err) {
       console.error(err.message);
     }
   };

   return (
     <Fragment>
       <button
         type="button"
         className="btn btn-warning"
         data-toggle="modal"
         data-target={`#id${song.song_id}`}
       >
         Edit
       </button>

       {/* 
         id = id10
       */}
       <div
         className="modal"
         id={`id${song.song_id}`}
         onClick={() => (setName(song.name), setArtist(song.artist), setAlbum(song.album), setType(song.type))}
       >
         <div className="modal-dialog">
           <div className="modal-content">
             <div className="modal-header">
               <h4 className="modal-title">Edit song</h4>
               <button
                 type="button"
                 className="close"
                 data-dismiss="modal"
                 onClick={() => (setName(song.name), setArtist(song.artist), setAlbum(song.album), setType(song.type))}
               >
                 &times;
               </button>
             </div>

             <div className="modal-body">
                <input
                 type="text"
                 className="form-control"
                 value={name}
                 onChange={e => setName(e.target.value)}/>
                <input
                type="text"
                className="form-control"
                value={artist}
                onChange={e => setArtist(e.target.value)}/>
                <input
                type="text"
                className="form-control"
                value={album}
                onChange={e => setAlbum(e.target.value)}/>
                <input
                 type="text"
                 className="form-control"
                 value={type}
                 onChange={e => setType(e.target.value)}/>
             </div>

             <div className="modal-footer">
               <button
                 type="button"
                 className="btn btn-warning"
                 data-dismiss="modal"
                 onClick={e => updateDescription(e)}
               >
                 Save
               </button>
               <button
                 type="button"
                 className="btn btn-danger"
                 data-dismiss="modal"
                 onClick={() => (setName(song.name), setArtist(song.artist), setAlbum(song.album), setType(song.type))}
               >
                 Close
               </button>
             </div>
           </div>
         </div>
       </div>
     </Fragment>
   );
 };

 export default EditSong;