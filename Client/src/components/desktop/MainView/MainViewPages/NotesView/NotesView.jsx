import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import NoteActions from './NoteActions';

import { getNotesAPI, createNoteAPI, updateNoteAPI, toggleNoteStatusAPI, deleteNoteAPI } from '../../../../../api/notesCRUD.api';

import { useAuth } from '../../../../../context/AuthContext';
import { useTags } from '../../../../../context/TagContext';

export default function NotesView({ currentView }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const {token} = useAuth();
  const { reloadTags } = useTags();


  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short', // "Jan", "Feb" like the Figma file uses
      year: 'numeric'
    });
  }
  

  async function loadNotesAndResetSelection() {
    try {
      const rawNotes  = await getNotesAPI(token, currentView);
      console.log('raw notes:',rawNotes);

      const updatedNotes = rawNotes.map(note => ({
        ...note,
        date: formatDate(note.last_edited || note.created_at) //<-- formatting dates from ISO to 'DD ShortMonth YYYY'
      }));

      setNotes(updatedNotes);
      setSelectedNote(updatedNotes.length ? { ...updatedNotes[0], isNew: false } : null); 
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  }

  useEffect(() => {
    loadNotesAndResetSelection();
  }, [currentView.type, currentView.tag, currentView.searchQuery]); // react on all filters, probably not ideal?

  function handleSelectNote(noteId) {
    const note = notes.find(n => n.id === noteId);
    setSelectedNote({ ...note, isNew: false });
  }

  function handleCreateNewNote() {
    const newNote = {
      id: 'temp-id',
      title: '',
      date: 'Not yet saved',
      tags: [],
      content: '',
      archived: false,
      isNew: true
    };
    setSelectedNote(newNote);
  }

  async function handleCancelEdit() {
    await loadNotesAndResetSelection(); // restore from backend
  }

  async function handleSaveNote() {
    try {
      if (selectedNote.id === 'temp-id') {
        await createNoteAPI(token, selectedNote);
      } else {
        await updateNoteAPI(token, selectedNote);
      }
      await loadNotesAndResetSelection(); //to update notes and tags list
      await reloadTags();
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  }

  async function handleArchiveNote() {
    if (!selectedNote) return;
    try {
      await toggleNoteStatusAPI(token, selectedNote);
      await loadNotesAndResetSelection();
    } catch (err) {
      console.error('Failed to archive note:', err);
    }
  }

  async function handleDeleteNote() {
    if (!selectedNote) return;
    try {
      await deleteNoteAPI(token, selectedNote.id);
      await loadNotesAndResetSelection();
      await reloadTags();
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  }

  return (
    <>
      <NotesList
        notes={notes}
        selectedNoteId={selectedNote?.id}
        onSelectNote={handleSelectNote}
        handleCreateNewNote={handleCreateNewNote}
        currentView={currentView}
      />
      {selectedNote ? (
        <NoteEditor
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          onSaveNote={handleSaveNote}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <section className="noteContent"><p>No note selected or available.</p></section>
      )}
      {selectedNote && (
        <NoteActions
          currentView={currentView}
          onArchiveNote={handleArchiveNote}
          onDeleteNote={handleDeleteNote}
          isNew={selectedNote.isNew}
        />
      )}
    </>
  );
}


