Template.mainBody.helpers({
  isLoggingIn: function() {
    if(Package["brettle:accounts-login-state"].LoginState.signedUp()){
      Session.set('isLoggingIn', false);
    }
    return Session.get('isLoggingIn');
  }
});
