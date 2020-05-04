const util = require("util");
const fs = require("fs");

const {
    v4: uuidv4
} = require('uuid');

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)


// creating a class called store

class Store {
    read() {
        return readFileAsync("./db/db.json", "utf8");
    }

    write(note) {
        return writeFileAsync("./db/db.json", JSON.stringify(note));
    }
//Shoutout Devon and Jalen for the assist
    async getNotes() {
        var notes = await this.read();
        var notesList = JSON.parse(notes);
        return notesList;
    }

    async addNote(note) {
        var newNote = {
            title: note.title,
            text: note.text,
            id: uuidv4()
        }
        var updatedNotes = await this.getNotes();
        updatedNotes.push(newNote);
        await this.write(updatedNotes);
        return updatedNotes;
    }
    async removeNote(id) {
        var notesList = await this.getNotes();
        var filteredList = await notesList.filter(note => note.id !== id)
        await this.write(filteredList);
        return filteredList;
    }
}

module.exports = new Store();