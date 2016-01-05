Meteor.methods({
  addNewPlaylist: function(url) {
    check(url, String);
    urlJson = getJsonFromUrl(url);
    Playlists.insert({list: urlJson.list, index: urlJson.index});
  }
});
