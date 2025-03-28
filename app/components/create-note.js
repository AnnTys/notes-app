import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class CreateNote extends Component {
  @service notesStorage;
  @tracked title = '';
  @tracked content = '';

 

  @action handleSubmit(event) {
    event.preventDefault();

    try {
      this.notesStorage.createNote(this.title, this.content);
      this.title = '';
      this.content = '';
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  @action updateTitle(event) {
    this.title = event.target.value;
  }

  @action updateContent(event) {
    this.content = event.target.value;
  }
}