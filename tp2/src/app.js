const express = require('express');

const app = express();

app.get('*', (req,res) => {
    res.status(200).json('Hello Clément');
});

app.listen(80);