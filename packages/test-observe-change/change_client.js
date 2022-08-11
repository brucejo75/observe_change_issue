import { ChangeCollection } from './change_common.js';
import './change_client.html';

Template.change.onRendered(function changeOnRendered() {
  const instance = this;
  instance.changeSub = Meteor.subscribe('change');
  instance.autorun(() => {
    if(!instance.changeSub.ready()) return;
    const doc = ChangeCollection.findOne({_id: 'change'});
    console.log('doc: ', doc);
  });
});

Template.change.events({
  'click #change': () => {
    Meteor.call('change', function cb(error) {
      if(error) console.error('change method error', error);
    });
  },
  'click #undefvalue': () => {
    Meteor.call('changeOther', function cb(error) {
      if(error) console.error('changeOther method error', error);
    });
  },
  'click #restart': () => {
  const instance = Template.instance();
  instance.changeSub.stop();
  instance.changeSub = Meteor.subscribe('change');
}
});
