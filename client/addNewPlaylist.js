Template.addNewPlaylist.events = {
  'keypress input[name="playlist-url"]': function (evt, template) {
    if (evt.which === 13) {
      var url = evt.target.value;
      Meteor.call('create_playlist', url);
      evt.target.value = '';
    }
    evt.preventDefault();
  }
};
