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
  value: 'foo',
  value2: 'value2'
};

if (Meteor.isServer) {
  ChangeCollection.upsert({_id: 'change'}, document);
}

let otherValue = undefined;

Meteor.methods({
  change() {
    if (!this.isSimulation) {
      document.value = document.value === 'foo' ? otherValue : 'foo';
      const update = document.value ? {$set: {value: document.value}} : {$unset: {value: ''}};
      ChangeCollection.upsert({_id: 'change'}, document);
    }
  },
  changeOther() {
    if (!this.isSimulation) {
      otherValue = otherValue === 'bar' ? undefined : 'bar';
    }
  }
});
