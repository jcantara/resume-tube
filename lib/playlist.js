Meteor.methods({
  update_playlist: function(playlist_id,index, time){
    check(playlist_id, String);
    check(index, Number);
    check(time, Number);
    Playlists.update(playlist_id, {$set: {index: index, time: time}});
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
    if(Meteor.isServer && Meteor.settings.youtubeApiKey) {
      HTTP.get("https://www.googleapis.com/youtube/v3/playlists",{params:
        {
          id: urlJson.list,
          part: "snippet,contentDetails",
          key: Meteor.settings.youtubeApiKey
        }
      }, function(err, data) {
        if (!err) {
          title = data["data"]["items"][0]["snippet"]["title"]
          itemCount = data["data"]["items"][0]["contentDetails"]["itemCount"]
          Playlists.insert({list: urlJson.list, index: index, title: title, itemCount: itemCount});
        }
      });
    } else {
      Playlists.insert({list: urlJson.list, index: index});
    }
  }
});
