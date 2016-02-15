var youtubePlaylistURLRegex = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;

var youtubePlaylistURL = Match.Where(function(x) {
  check(x, String);
  var match = x.match(youtubePlaylistURLRegex);
  return match && match[2]
});

Meteor.methods({
  update_playlist: function(playlist_id, index, time, duration){
    check(playlist_id, String);
    check(index, Number);
    check(time, Number);
    check(duration, Number);
    playlist = Playlists.findOne(playlist_id);
    if(!!playlist && playlist.userId == this.userId) {
      Playlists.update(playlist_id, {$set: {index: index, time: time, duration: duration}});
    } else {
      throw new Meteor.error('update_playlist', 'Unauthorized playlist access');
    }
    return null;
  },
  remove_playlist: function(playlist_id) {
    check(playlist_id, String);
    playlist = Playlists.findOne(playlist_id);
    if(!!playlist && playlist.userId == this.userId) {
      Playlists.remove(playlist_id);
    } else {
      throw new Meteor.error('update_playlist', 'Unauthorized playlist access');
    }
    return null;
  },
  create_playlist: function(url) {
    check(url, youtubePlaylistURL);
    if (this.userId) {
      urlJson = getJsonFromUrl(url);
      if(urlJson.index){
        index = urlJson.index;
      } else {
        index = 0;
      }
      newId = Playlists.insert({list: urlJson.list, index: index, userId: this.userId});
      if(Meteor.isServer && Meteor.settings.youtubeApiKey) {
        fetchPlaylistMetaData(newId);
      }
      return newId;
    }
  }
});
