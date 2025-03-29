import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ModalComponent extends Component {
  @action
  closeModal() {
    if (this.args.onClose) {
      this.args.onClose();
    }
  }
  
  @action
  handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
  
  @action
  stopPropagation(event) {
    event.stopPropagation();
  }
}
