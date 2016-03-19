Template.account.events({

  'click .logout': function(evt) {
    Meteor.logout();
    evt.preventDefault();
  },
  'click .login': function(evt) {
    Meteor.loginWithGoogle({requestPermissions: []});
    evt.preventDefault();
  }

});
