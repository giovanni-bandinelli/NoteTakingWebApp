/*My probably ugly solution to Desktop layout having 2 sibiling components 
(NavSideBar and  NotesView's NoteEditor &  NoteActions) needing to update 
the tags list
*/

import { createContext, useContext, useState, useEffect } from 'react';
import { getTagsAPI } from '../api/notesCRUD.api'; 
import { useAuth } from './AuthContext';

const TagContext = createContext();

export function TagProvider({ children }) {
  const { token } = useAuth();
  const [tags, setTags] = useState([]);

  const loadTags = async () => {
    if (!token) return;
    try {
      const data = await getTagsAPI(token);
      setTags(data.tags);
    } catch (err) {
      console.error('Failed to load tags:', err);
    }
  };

  useEffect(() => {
    loadTags();
  }, [token]);

  return (
    <TagContext.Provider value={{ tags, reloadTags: loadTags }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const context = useContext(TagContext);
  if (!context) throw new Error('useTags must be used within TagProvider');
  return context;
}
