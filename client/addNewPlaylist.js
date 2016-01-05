Template.addNewPlaylist.events = {
  'keypress input[name="playlist-url"]': function (evt, template) {
    if (evt.which === 13) {
      var url = template.find('input[name="playlist-url"]').value;
      Meteor.call('addNewPlaylist', url);
    }
    evt.preventDefault();
  }
};
