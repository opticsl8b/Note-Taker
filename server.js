// Import express module
const express = require('express');
const app = express();



// Import modules
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const path = require('path')

const PORT = process.env.PORT || 3001;

// serve all static files from 'public' folder 
app.use(express.static('public'));

// middleware that recognize incoming request are json object or string/arrays
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// web.js --frontend 
app.use(webRoutes);


// api.js --backend
// initial /api to all 'apiRoutes' middlewares 
app.use('/api', apiRoutes)


// 404 page

app.get('*', (req, res) => {
    const fourOfour = path.join(__dirname, 'public', '404.html');
    res.status(404).sendFile(fourOfour);
})

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
})