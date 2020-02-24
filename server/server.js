const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;


app.use(express.json());
app.use(express.static('assets'));

// serve the static assets
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// 404 handler
app.use('*', (req, res) => {
    res.sendStatus(404);
  });

// global error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});