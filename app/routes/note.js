import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class NoteRoute extends Route {
  @service notesStorage;
  @service router;

  model(params) {
    const noteId = parseInt(params.note_id);
    return {
      note: this.notesStorage.notes.find((note) => note.id === noteId),
    };
  }
  actions = {
    deleteNote(noteId) {
      this.notesStorage.deleteNote(noteId);
      this.router.transitionTo('index');
    },
  };
  setupController(controller, model) {
    super.setupController(controller, model);
    
    if (model.note) {
      controller.openModal();
    }
  }
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.isModalOpen = false;
    }
  }
}
