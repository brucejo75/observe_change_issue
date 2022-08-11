import { ChangeCollection } from './change_common.js';

Meteor.publish('change', function publishChanges() {
  const self = this;

  ChangeCollection.find({}).observe({
    added(doc) {
      self.added('change', doc._id, doc);
      self.ready();
    },
    changed(newDoc, oldDoc) {
      self.changed('change', newDoc._id, newDoc);
      console.log('changed doc: ', newDoc);
      self.ready();
    },
    removed(oldDoc) {
      self.remove('change', oldDoc._id);
      self.ready();
    }
  });
  self.ready();
  return;
});
//foobar
