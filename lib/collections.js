Playlists = new Mongo.Collection("playlists");

if(Meteor.isServer){
  Meteor.publish("playlists", function() {
    playlists = Playlists.find({});
    playlistIds = playlists.map(function(playlist){return playlist._id});
    fetchPlaylistMetaData(playlistIds);
    return playlists;
  });
}

if(Meteor.isClient){
  Meteor.subscribe("playlists");
}
