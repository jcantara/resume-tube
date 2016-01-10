Meteor.methods({
  update_playlist: function(playlist_id,index, time, duration){
    check(playlist_id, String);
    check(index, Number);
    check(time, Number);
    check(duration, Number);
    Playlists.update(playlist_id, {$set: {index: index, time: time, duration: duration}});
    return null;
  },
  remove_playlist: function(playlist_id) {
    check(playlist_id, String);
    Playlists.remove(playlist_id);
    return null;
  },
  create_playlist: function(url) {
    check(url, String);
    urlJson = getJsonFromUrl(url);
    if(urlJson.index){
      index = urlJson.index;
    } else {
      index = 0;
    }
    newId = Playlists.insert({list: urlJson.list, index: index});
    if(Meteor.isServer && Meteor.settings.youtubeApiKey) {
      fetchPlaylistMetaData(newId);
    }
    return newId;
  }
});
