import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexNoteController extends Controller {
  @service notesStorage;
  @service router;

  @tracked isModalOpen = false;
  @tracked isEditing = false;
  @tracked editedTitle = '';
  @tracked editedContent = '';

  @action openModal() {
    this.isModalOpen = true;
  }

  @action closeModal() {
    this.isEditing = false;
    this.isModalOpen = false;
    this.router.transitionTo('index');
  }
  @action updateEditedTitle(event) {
    this.editedTitle = event.target.value;
  }

  @action updateEditedContent(event) {
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
        this.editedContent,
      );
      this.closeModal();
    }
  }

  @action deleteNote() {
    this.notesStorage.deleteNote(this.model.note.id);
    this.closeModal();
  }
}
