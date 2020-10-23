const Joi = require('joi');
const { json } = require('express');
const express = require('express');
const app = express();
app.use(express.json())

const genres = [
    { id: 1, name: 'Action'},
    { id: 2, name: 'Love'},
    { id: 3, name: 'Sceince'},
]

app.get('/', (req, res) => {
    res.send('Hello Nodejs');
})

// get all genres
app.get('/api/genres', (req, res) => {
    return res.status(200).send(genres);
})

// get single genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');

    return res.status(200).send(genre);
})

// add genre
app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
    }

    genres.push(genre);
    return res.status(200).send(genre);
})

// update genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');

    const {error} = validateGenre(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    return res.status(200).send(genre);
})

// delete genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    return res.status(200).send(genre);
})

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

const  port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));