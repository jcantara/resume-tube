fetchPlaylistMetaData = function(ids) {
  if(typeof(ids) == "string") {
    ids = [ids];
  }
  var playlists = Playlists.find({_id: {$in: ids}});
  var playlistListIds = playlists.map(function(playlist){
    return playlist.list;
  });
  playlists = playlists.fetch();
  HTTP.get("https://www.googleapis.com/youtube/v3/playlists",{params:
    {
      id: playlistListIds.join(','),
      part: "snippet,contentDetails",
      key: Meteor.settings.youtubeApiKey
    }
  }, function(err, data) {
    if (!err) {
      data["data"]["items"].forEach(function(apiPlaylist){
        var playlist = null;
        playlist = _.find(playlists, function(pl){return pl.list === apiPlaylist.id});
        if(playlist) {
          var title = apiPlaylist["snippet"]["title"]
          var itemCount = apiPlaylist["contentDetails"]["itemCount"]
          Playlists.update(playlist._id, {$set: {title: title, itemCount: itemCount}});
        }
      });
    }
  });
}
