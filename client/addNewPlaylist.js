Template.addNewPlaylist.events = {
  'keypress input[name="playlist-url"]': function (evt, template) {
    if (evt.which === 13) {
      var url = evt.target.value;
      Meteor.call('create_playlist', url, function(err, res){
        if(err) {
          Session.set('errorMessage', "Could not create playlist, is the URL a valid playlist?");
        } else {
          Session.set('playingPlaylistId', res);
        }
      });
      evt.target.value = '';
      evt.preventDefault();
    }
  }
};
