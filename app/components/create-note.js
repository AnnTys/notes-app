import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { modifier } from 'ember-modifier';

export default class CreateNote extends Component {
  @service notesStorage;
  @tracked title = '';
  @tracked content = '';
  @tracked isExpanded = false;
  @tracked isEmpty = false;
  @tracked textareaElement = null;

  setupClickOutside = modifier((element) => {
    const handleDocumentClick = (event) => {
      if (this.isExpanded && !element.contains(event.target)) {
        if (this.textareaElement) {
          this.textareaElement.style.height = '';
        }
        this.isExpanded = false;
        this.title = '';
        this.content = '';
      }
    };
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  });

  setupTextarea = modifier((element) => {
    this.textareaElement = element;

    const resizeTextarea = () => {
      if (this.textareaElement) {
        this.textareaElement.style.height = 'auto';
        this.textareaElement.style.height =
          this.textareaElement.scrollHeight + 'px';
      }
    };

    setTimeout(resizeTextarea, 0);

    element.addEventListener('input', resizeTextarea);
    element.addEventListener('focus', resizeTextarea);

    return () => {
      element.removeEventListener('input', resizeTextarea);
      element.removeEventListener('focus', resizeTextarea);
      this.textareaElement = null;
    };
  });

  @action resetTextareaHeight() {
    if (this.textareaElement) {
      this.textareaElement.style.height = '';
    }
  }

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
    this.resetTextareaHeight();
    this.title = '';
    this.content = '';
    this.isExpanded = false;
  }

  @action updateTitle(event) {
    this.title = event.target.value;
  }

  @action updateContent(event) {
    this.content = event.target.value;
    if (this.textareaElement) {
      this.textareaElement.style.height = 'auto';
      this.textareaElement.style.height =
        this.textareaElement.scrollHeight + 'px';
    }
  }

  @action expandForm() {
    this.isExpanded = true;
    if (this.textareaElement) {
      this.textareaElement.style.height = 'auto';
      this.textareaElement.style.height =
        this.textareaElement.scrollHeight + 'px';
    }
  }

  @action
  handleFormClick(event) {
    event.stopPropagation();
  }
}
