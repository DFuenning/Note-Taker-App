
const path = require("path");
const router = require("express").Router();
const store = require("../db/store");
const textInfo = require("../db/db.json")

//Created via homework session and tutoring
router.get("/notes", function (req, res) {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post("/notes", function (req, res) {
    store
        .addNote()
        .then(note => res.json(note))
        .catch(err => res.status(500).json(err));
});
router.delete("/notes/:id", function(req, res) {
    console.log(`Deleting on behalf of ${req.params.id}`);
    store
      .removeNote()
      .then(notes => res.json(notes))
      .catch(err => res.status(500).json(err));
  });
   
module.exports = router;
// const db = require("../db/db.json");
// const fs = require("fs");
// const uuid = require("uuidv4");
// const router = require("express").Router();


// router.get("/api/notes", function (req, res) {
//     res.send(db);
// });

// router.post("/api/notes", function (req, res) {

//     let noteId = uuid();
//     let newNote = {
//         id: noteId,
//         title: req.body.title,
//         text: req.body.text
//     };

//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//         if (err) throw err;

//         const allNotes = JSON.parse(data);

//         allNotes.push(newNote);

//         fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
//             if (err) throw err;
//             res.send(db);
//             console.log("Note created!")
//         });
//     });
// });

// router.delete("/api/notes/:id", (req, res) => {

//     let noteId = req.params.id;

//     fs.readFile("./db/db.json", "utf8", (err, data) => {
//         if (err) throw err;

//         const allNotes = JSON.parse(data);
//         const newAllNotes = allNotes.filter(note => note.id != noteId);

//         fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
//             if (err) throw err;
//             res.send(db);
//             console.log("Note deleted!")
//         });
//     });
// });
// module.exports = router;