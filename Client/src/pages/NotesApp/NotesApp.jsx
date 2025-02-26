// Main app component once authenticated
 export default function NotesApp() {
  return (<><p>Siamo in NotesApp zio</p></>)
};
  






/**
 *   <div className="app-layout">
      <Sidebar />
      <main>
        <NotesList />
        <NoteEditor />
      </main>
    </div>
  );
}

// Start with mock data for notes
const mockNotes = [
  {
    id: 1,
    title: "React Performance",
    content: "Key performance tips...",
    tags: ["dev", "react"],
    lastEdited: new Date(),
  },
  // ... more mock notes
];

// Example of a custom hook for notes (start with mock data)
function useNotes() {
  const [notes, setNotes] = useState(mockNotes);
  
  const addNote = (note) => {
    setNotes([...notes, { ...note, id: Date.now() }]);
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
}
 */