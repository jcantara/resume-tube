Session.setDefault('errorMessage', null);
Session.setDefault('warnMessage', null);
Template.error.helpers({
  error: function() {
    return (Session.get('errorMessage') !== null);
  },
  errorMessage: function() {
    return Session.get('errorMessage');
  },
  warn: function() {
    return (Session.get('warnMessage') !== null);
  },
  warnMessage: function() {
    return Session.get('warnMessage');
  }
});

Template.error.events = {
  'click .close.error': function(evt, template) {
    Session.set('errorMessage', null);
  },
  'click .close.warn': function(evt, template) {
    Session.set('warnMessage', null);
  }
};

Tracker.autorun(function() {
  if(!Package["brettle:accounts-login-state"].LoginState.signedUp()) {
    Session.set('warnMessage', 'Warning, playlists will only be saved for this browser session unless you register');
  } else {
    Session.set('warnMessage', null);
  }
});
