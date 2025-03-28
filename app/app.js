import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'notes-app/config/environment';
import './app.css'
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
