Meteor.methods({
  addNewPlaylist: function(url) {
    check(url, String);
    urlJson = getJsonFromUrl(url);
    if(urlJson.index){
      index = urlJson.index;
    } else {
      index = 0;
    }
    Playlists.insert({list: urlJson.list, index: index});
  }
});
