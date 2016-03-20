Session.setDefault('isLoggingIn', false);

Template.account.helpers({
  signedUp: function() {
    return Package["brettle:accounts-login-state"].LoginState.signedUp()
  }
});

Template.account.events({

  'click .logout': function(evt) {
    Meteor.logout();
    evt.preventDefault();
  },
  'click .login': function(evt) {
    Session.set('isLoggingIn', true);
    evt.preventDefault();
  }

});
