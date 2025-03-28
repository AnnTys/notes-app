import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NoteController extends Controller {
  @service notesStorage;
  @service router;
  @tracked isEditing = false;
  @tracked editedTitle = '';
  @tracked editedContent = '';

  @action
  updateEditedTitle(event) {
    this.editedTitle = event.target.value;
  }

  @action
  updateEditedContent(event) {
    this.editedContent = event.target.value;
  }

  @action startEdit() {
    this.editedTitle = this.model.note.title;
    this.editedContent = this.model.note.content;
    this.isEditing = true;
  }

  @action cancelEdit() {
    this.isEditing = false;
    this.editedTitle = this.model.note.title;
    this.editedContent = this.model.note.content;
  }

  @action saveNote(event) {
    event.preventDefault();
    if (this.editedTitle.trim() && this.editedContent.trim()) {
      this.notesStorage.updateNote(
        this.model.note.id, 
        this.editedTitle, 
        this.editedContent
      );
      this.isEditing = false;
      this.router.transitionTo('index');
    }
  }

  @action deleteNote() {
    this.notesStorage.deleteNote(this.model.note.id);
    this.router.transitionTo('index');
  }

}
