
const express = require('express');
const path = require('path');
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = [
    {
      routeName: 'yoda',
      name: 'Yoda',
      role: 'Jedi Master',
      age: 900,
      forcePoints: 2000,
    },
    {
      routeName: 'darthmaul',
      name: 'Darth Maul',
      role: 'Sith Lord',
      age: 200,
      forcePoints: 1200,
    },
    {
      routeName: 'obiwankenobi',
      name: 'Obi Wan Kenobi',
      role: 'Jedi Master',
      age: 55,
      forcePoints: 1350,
    },
  ];


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/add', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/api/notes', (req, res) => res.json(notes));