import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NoteRoute extends Route {
  @service notesStorage;

  model(params) {
    const noteId = parseInt(params.note_id);
    return {
      note: this.notesStorage.notes.find(note => note.id === noteId)
    };
  }
}