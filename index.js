const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//##    CORS                ##
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.post("/songs", async (req, res) => {
    try{
        console.log(req.body);
        const { name, artist, album, type } = req.body;
        const newSong = await pool.query("INSERT INTO songs (name, artist, album, type) VALUES ($1, $2, $3, $4) RETURNING *", [name, artist, album, type]);
        res.json(newSong.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/songs", async (req, res) => {
    try {
      const allSongs = await pool.query("SELECT * FROM songs");
      res.json(allSongs.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

app.get("/songs/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const song = await pool.query("SELECT * from songs WHERE song_id = $1", [id]);
    res.json(song.rows[0])
    } catch (err) {
    console.error(err.message);
    }
});

app.put('/songs/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { name, artist, album, type } = req.body;
        const updateSong = await pool.query("UPDATE songs SET (name, artist, album, type) = ($1, $2, $3, $4) WHERE song_id = $5", [name, artist, album, type, id]);
        res.json('Song was updated');
    } catch(err) {
      console.error(err.message);
    }
});

app.delete('/songs/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteSong = await pool.query("DELETE FROM songs WHERE song_id = $1", [id])
        res.json('Song was deleted');
    } catch(err) {
        console.error(err.message);
    }
})



app.listen(5000, () => {
    console.log("server has started on port 5000");
});