Meteor.methods({
  update_playlist: function(playlist_id,index, time){
    console.log(playlist_id);
    check(playlist_id, String);
    check(index, Number);
    check(time, Number);
    Playlists.update(playlist_id, {$set: {index: index, time: time}});
  }
});
