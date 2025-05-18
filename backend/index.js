const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/notes';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const NoteSchema = new mongoose.Schema({
  content: String,
});
const Note = mongoose.model('Note', NoteSchema);

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const note = new Note({ content: req.body.content });
  await note.save();
  res.status(201).json(note);
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
