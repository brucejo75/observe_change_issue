import { ChangeCollection } from './change_common.js';
import _ from 'lodash';

Meteor.publish('change', function publishChanges() {
  const self = this;

  const handle = ChangeCollection.find({}).observe({
    added(doc) {
      self.added('change', doc._id, doc);
      console.log('added doc: ', doc);
      self.ready();
    },
    changed(newDoc, oldDoc) {
      const uDoc = newDoc;
      self.changed('change', newDoc._id, uDoc);
      console.log('changed doc: ', uDoc);
      self.ready();
    },
    removed(oldDoc) {
      self.remove('change', oldDoc._id);
      console.log('removed doc: ', oldDoc);
      self.ready();
    }
  });
  self.onStop(() => handle.stop());
  self.ready();
  return;
});
