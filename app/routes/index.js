
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service notesStorage;

  model() {
    return {
      notes: this.notesStorage.notes
    };
  }
}