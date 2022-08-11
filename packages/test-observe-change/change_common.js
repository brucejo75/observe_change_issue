export const ChangeCollection = new Mongo.Collection('change');

let document = {
  _id: 'change',
  value: 'foo'
};

ChangeCollection.upsert({_id: 'change'}, document);

let otherValue = 'bar';

Meteor.methods({
  change() {
    document.value = document.value === 'foo' ? otherValue : 'foo';
    ChangeCollection.upsert({_id: 'change'}, document);
  },
  changeOther() {
    otherValue = otherValue === 'bar' ? undefined : 'bar';
  }
});
