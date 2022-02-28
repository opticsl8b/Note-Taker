const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const { notEqual } = require('assert');
const { route } = require('./web');

// get content from db.json
const dbPath = path.join(__dirname, '..', 'db', 'db.json');


/**
 * 
 * @returns {Array}
 */
function scrapeNotes() {

    return JSON.parse(fs.readFileSync(dbPath, 'utf-8') || '[]');
}

router.get('/notes', (req, res) => {

    // convert the content of a string array into a normal array
    const dbContent = scrapeNotes();

    // send them back
    res.json(dbContent);
})


router.post('/notes', (req, res) => {

    // destruting input
    const { title, text } = req.body;
    console.log(title, text);

    // create a new note to db.json
    const newNote = {
            id: uuid.v4(),
            title,
            text
        }
        // get exsting note from db.json
    const existingNotes = scrapeNotes();

    // add new note to existing note and save

    existingNotes.push(newNote);

    fs.writeFileSync(dbPath, JSON.stringify(existingNotes), 'utf-8');

    // send back response to frontend

    res.json(newNote);

})

// update

router.put('/notes/:id', (req, res) => {

    // retrive existing notes
    const existingNotes = scrapeNotes();

    // target the note
    const indexFound = existingNotes.findIndex((note) => note.id === req.params.id);

    if (indexFound === -1) {
        res.status(420).json({
            error: 'not found!!'
        })
    }
    // update it
    const targetNotes = existingNotes[indexFound];

    targetNotes.title = req.body.title || targetNotes.title;
    targetNotes.text = req.body.text || targetNotes.text;

    // save & send
    fs.writeFileSync(dbPath, JSON.stringify(existingNotes), 'utf-8');

    res.json(targetNotes);

})



// getting a specific note
router.get('/notes/:id', (req, res) => {
    // retrive exisiting notes
    const notes = scrapeNotes();

    // find the note with matching matching id
    const found = notes.find((note) => note.id === req.params.id)

    if (!found) {
        res.status(420).json({
            error: 'not found!!'
        })
    } else {
        // send back 
        res.json(notes)
    }

})


router.delete('/notes/:id', (req, res) => {

    // retrive existing notes
    const existingNotes = scrapeNotes();

    // select all notes besides the one we want to delete
    const remainNotes = existingNotes.filter((existingNotes) => existingNotes.id !== req.params.id);

    // save

    fs.writeFileSync(dbPath, JSON.stringify(remainNotes), 'utf-8');

    // send back
    res.json({
        data: 'Done',
    })

})
module.exports = router;