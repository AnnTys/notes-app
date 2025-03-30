import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexNoteRoute extends Route {
  @service notesStorage;
  @service router;

  model(params) {
    const noteId = parseInt(params.note_id);
    return {
      note: this.notesStorage.notes.find((note) => note.id === noteId),
    };
  }
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
