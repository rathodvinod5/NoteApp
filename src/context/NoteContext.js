import React, { createContext, useReducer, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import syncWithServer from '../services/service';
import NetInfo from '@react-native-community/netinfo';

const NoteContext = createContext();

const initialState = {
  notes: [],
};

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return { ...state, notes: action.payload };
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.payload.id ? action.payload : note),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
      };
    case 'SORT_NOTES_BY_TITLE':
      return {
        ...state,
        notes: [...state.notes].sort((a, b) => a.title.localeCompare(b.title)),
      };
    case 'SORT_NOTES_BY_DATE':
      return {
        ...state,
        notes: [...state.notes].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
      };
    case 'RESET_SORT_NOTES_BY_TITLE':
      return {
        ...state,
        notes: [...state.notes].sort((a, b) => b.title.localeCompare(a.title)),
      };
    case 'RESET_SORT_NOTES_BY_DATE':
      return {
        ...state,
        notes: [...state.notes].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
      };
    case 'SET_PENDING_SYNC':
      return { ...state, pendingSync: action.payload };
    case 'CLEAR_PENDING_SYNC':
      return { ...state, pendingSync: [] };

    default:
      return state;
  }
};

export const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const syncPendingData = async () => {
    const pendingSync = await AsyncStorage.getItem('pendingSync');
    const pendingNotes = JSON.parse(pendingSync) || [];

    if (pendingNotes.length > 0) {
      // Assuming you have a function syncWithServer that handles the actual data syncing
      await syncWithServer(pendingNotes);
      dispatch({ type: 'CLEAR_PENDING_SYNC' });
      await AsyncStorage.removeItem('pendingSync');
    }
  };

  const loadNotes = async () => {
    const notes = await AsyncStorage.getItem('notes');
    // make some actual api calls at this point if the network is present else read from the local storage,
    // for now we are going with local storage
    dispatch({ type: 'LOAD_NOTES', payload: JSON.parse(notes) || [] });
  };

  const addNote = async (note) => {
    dispatch({ type: 'ADD_NOTE', payload: note });
    await AsyncStorage.setItem('notes', JSON.stringify([...state.notes, note]));
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      const pendingSync = await AsyncStorage.getItem('pendingSync');
      const pendingNotes = JSON.parse(pendingSync) || [];
      await AsyncStorage.setItem('pendingSync', JSON.stringify([...pendingNotes, note]));
    } else {
      // make some actual api calls at this point
      await syncWithServer([note]);
    }
  };

  const editNote = async (note) => {
    dispatch({ type: 'EDIT_NOTE', payload: note });
    await AsyncStorage.setItem('notes', JSON.stringify(state.notes.map(n => n.id === note.id ? note : n)));
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      const pendingSync = await AsyncStorage.getItem('pendingSync');
      const pendingNotes = JSON.parse(pendingSync) || [];
      const updatedPendingNotes = pendingNotes.map(n => n.id === note.id ? note : n);
      await AsyncStorage.setItem('pendingSync', JSON.stringify(updatedPendingNotes));
    } else {
      await syncWithServer([note]);
    }
  };

  const deleteNote = async (id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
    await AsyncStorage.setItem('notes', JSON.stringify(state.notes.filter(note => note.id !== id)));
    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    if (!isConnected) {
      const pendingSync = await AsyncStorage.getItem('pendingSync');
      const pendingNotes = JSON.parse(pendingSync) || [];
      const updatedPendingNotes = pendingNotes.filter(note => note.id !== id);
      await AsyncStorage.setItem('pendingSync', JSON.stringify(updatedPendingNotes));
    } else {
      await syncWithServer([{ id, delete: true }]);
    }
  };

  const sortNotesByTitle = () => {
    dispatch({ type: 'SORT_NOTES_BY_TITLE' });
  };

  const sortNotesByDate = () => {
    dispatch({ type: 'SORT_NOTES_BY_DATE' });
  };

  const resetSortNotesByTitle = () => {
    dispatch({ type: 'RESET_SORT_NOTES_BY_TITLE' });
  };

  const resetSortNotesByDate = () => {
    dispatch({ type: 'RESET_SORT_NOTES_BY_DATE' });
  };

  useEffect(() => {
    loadNotes();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncPendingData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NoteContext.Provider 
      value={{ 
        state, 
        loadNotes, 
        addNote, 
        editNote, 
        deleteNote, 
        sortNotesByTitle, 
        sortNotesByDate,
        resetSortNotesByTitle,
        resetSortNotesByDate
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
