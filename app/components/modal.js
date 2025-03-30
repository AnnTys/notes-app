import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class ModalComponent extends Component {
  @tracked isVisible = false;

  @action handleDidInsert() {
    this.isVisible = true;
  }

  @action closeModal() {
    this.isVisible = false;
    later(
      this,
      () => {
        if (this.args.onClose) {
          this.args.onClose();
        }
      },
      500,
    );
  }

  @action handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  @action stopPropagation(event) {
    event.stopPropagation();
  }
}
