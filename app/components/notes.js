import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Notes extends Component {
  @service router;
  @service notesStorage;

  get sortedNotes() {
    return [...this.notesStorage.notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
  }

  @action selectNote(note) {
    this.router.transitionTo('index.note', note.id);
  }
}
