import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import NoteEditor from './NoteEditor';
import NoteActions from './NoteActions';
import ConfirmModal from '../../../../ConfirmModal/ConfirmModal';

import { DeleteIcon, ArchiveIcon } from '../../../../icons';

import {
  getNotesAPI,
  createNoteAPI,
  updateNoteAPI,
  toggleNoteStatusAPI,
  deleteNoteAPI,
} from '../../../../../api/notesCRUD.api';

import { useAuth } from '../../../../../context/AuthContext';
import { useTags } from '../../../../../context/TagContext';

export default function NotesView({ currentView }) {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const { token } = useAuth();
  const { reloadTags } = useTags();

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  async function loadNotesAndResetSelection() {
    try {
      const rawNotes = await getNotesAPI(token, currentView);
      const updatedNotes = rawNotes.map(note => ({
        ...note,
        date: formatDate(note.last_edited || note.created_at),
      }));
      setNotes(updatedNotes);
      setSelectedNote(updatedNotes.length ? { ...updatedNotes[0], isNew: false } : null);
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  }

  useEffect(() => {
    loadNotesAndResetSelection();
  }, [currentView.type, currentView.tag, currentView.searchQuery]);

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
      isNew: true,
    };
    setSelectedNote(newNote);
  }

  async function handleCancelEdit() {
    await loadNotesAndResetSelection();
  }

  async function handleSaveNote() {
    try {
      if (selectedNote.id === 'temp-id') {
        await createNoteAPI(token, selectedNote);
      } else {
        await updateNoteAPI(token, selectedNote);
      }
      await loadNotesAndResetSelection();
      await reloadTags();
    } catch (err) {
      console.error('Failed to save note:', err);
    }
  }

  async function handleConfirmArchive() {
    if (!selectedNote) return;
    try {
      await toggleNoteStatusAPI(token, selectedNote);
      await loadNotesAndResetSelection();
      setShowArchiveModal(false);
    } catch (err) {
      console.error('Failed to archive note:', err);
    }
  }

  async function handleConfirmDelete() {
    if (!selectedNote) return;
    try {
      await deleteNoteAPI(token, selectedNote.id);
      await loadNotesAndResetSelection();
      await reloadTags();
      setShowDeleteModal(false);
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
        <>
          <NoteActions
            currentView={currentView}
            onRequestDelete={() => setShowDeleteModal(true)}
            onRequestArchive={() => setShowArchiveModal(true)}
            isNew={selectedNote.isNew}
          />

          <ConfirmModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            icon={<DeleteIcon />}
            title="Delete Note"
            message="Are you sure you want to permanently delete this note? This action cannot be undone."
            confirmLabel="Delete Note"
            confirmStyle="danger"
          />

          <ConfirmModal
            isOpen={showArchiveModal}
            onClose={() => setShowArchiveModal(false)}
            onConfirm={handleConfirmArchive}
            icon={<ArchiveIcon />}
            title="Archive Note"
            message="Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
            confirmLabel="Archive Note"
            confirmStyle="primary"
          />
        </>
      )}
    </>
  );
}
