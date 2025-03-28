import { module, test } from 'qunit';
import { setupRenderingTest } from 'notes-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | create-note', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CreateNote />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CreateNote>
        template block text
      </CreateNote>
    `);

    assert.dom().hasText('template block text');
  });
});
