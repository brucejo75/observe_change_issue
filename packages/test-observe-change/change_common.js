export const ChangeCollection = new Mongo.Collection('change');

ChangeCollection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

ChangeCollection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let document = {
  _id: 'change',
  value: 'foo'
};

if (Meteor.isServer) {
  ChangeCollection.upsert({_id: 'change'}, document);
}

let otherValue = 'bar';

Meteor.methods({
  change() {
    if (!this.isSimulation) {
      document.value = document.value === 'foo' ? otherValue : 'foo';
      const update = document.value ? {$set: {value: document.value}} : {$unset: {value: ''}};
      // ChangeCollection.upsert({_id: 'change'}, {$set: {value: document.value}});
      ChangeCollection.upsert({_id: 'change'}, document);
    }
  },
  changeOther() {
    if (!this.isSimulation) {
      otherValue = otherValue === 'bar' ? undefined : 'bar';
    }
  }
});
