const router = require('express').Router();
const path = require('path');

// create routes reading index.html & notes.html
router.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, '..', 'public', 'index.html')
    res.sendFile(htmlPath);
})

router.get('/notes', (req, res) => {
    const notesPath = path.join(__dirname, '..', 'public', 'notes.html')
    res.sendFile(notesPath);
})

module.exports = router;