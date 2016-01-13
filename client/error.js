Session.setDefault('errorMessage', null);
Template.error.helpers({
  error: function() {
    return (Session.get('errorMessage') !== null);
  },
  errorMessage: function() {
    return Session.get('errorMessage');
  }
});

Template.error.events = {
  'click .close': function(evt, template) {
    Session.set('errorMessage', null);
  }
};
