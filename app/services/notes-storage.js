import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NotesStorageService extends Service {
  @tracked notes = [];

  constructor() {
    super(...arguments);
    this.loadNotes();
  }

  loadNotes() {
    try {
        const storedData = localStorage.getItem('dataNotes');
        this.notes = storedData ? JSON.parse(storedData) : null;
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
      }
  }

  saveNotes() {
    localStorage.setItem('dataNotes', JSON.stringify(this.notes));
  }

  createNote(title, content) {
    if (!title.trim() && !content.trim()) {
      throw new Error('Title and content cannot be empty');
    }
    const newNote = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date().toISOString()
    };
    this.notes = [...this.notes, newNote];
    this.saveNotes();
    return newNote;
  }

  updateNote(id, title, content) {
    this.notes = this.notes.map(note => 
      note.id === id ? { ...note, title, content } : note
    );
    this.saveNotes();
  }
  

  deleteNote(id) {
    this.notes = this.notes.filter(note => note.id !== id);
    this.saveNotes();
  }

 
}