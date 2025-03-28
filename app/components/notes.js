import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Notes extends Component {
  @service router;
  @service notesStorage;
  @tracked selectedNote = null;

  get sortedNotes() {
    return [...this.notesStorage.notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  @action
  selectNote(note) {
    this.selectedNote = note;
    this.router.transitionTo('note', note.id);
  }
}
