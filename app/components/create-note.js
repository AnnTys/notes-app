import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class CreateNote extends Component {
  @service notesStorage;
  @tracked title = '';
  @tracked content = '';
  @tracked isExpanded = false;
  @tracked isEmpty = false;

  @action handleSubmit(event) {
    event.preventDefault();

    const result = this.notesStorage.createNote(this.title, this.content);

    if (!result) {
      this.isEmpty = true;
      setTimeout(() => {
        this.isEmpty = false;
      }, 600);
      return;
    }
    this.title = '';
    this.content = '';
    this.isExpanded = false;
  }

  @action updateTitle(event) {
    this.title = event.target.value;
  }

  @action updateContent(event) {
    this.content = event.target.value;
  }

  @action expandForm() {
    this.isExpanded = true;
  }

  @action handleBackdropFormClick(event) {
    if (event.target === event.currentTarget) {
      this.isExpanded = false;
      this.title = '';
      this.content = '';
    }
  }
}
