Template.listPlaylists.helpers({
  playlists: function() {
    return Playlists.find({});
  }
});
