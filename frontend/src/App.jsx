import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Use backend service name 'backend' in docker-compose network, or localhost for local dev
const API_URL = 'http://backend:3000/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    try {
      await axios.post(API_URL, { content: newNote });
      setNewNote('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>📝 Notes</h1>
      <div className="input-section">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Type a note..."
        />
        <button onClick={addNote}>Add Note</button>
      </div>
      <ul className="note-list">
        {notes.map((note) => (
          <li key={note._id}>
            {note.content}
            <button onClick={() => deleteNote(note._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
