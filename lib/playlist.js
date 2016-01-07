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
  }
});
