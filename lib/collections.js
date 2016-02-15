Playlists = new Mongo.Collection("playlists");

if(Meteor.isServer){
  Meteor.publish("playlists", function() {
    if (!this.userId) {
      return this.ready();
    }
    playlists = Playlists.find({
      userId: this.userId
    });
    playlistIds = playlists.map(function(playlist){return playlist._id});
    fetchPlaylistMetaData(playlistIds);
    return playlists;
  });
}

if(Meteor.isClient){
  Meteor.subscribe("playlists");
  ClientPlaylists = new Mongo.Collection("clientPlaylists"); // client-only playlists when the user isn't logged-in
}

Meteor.users.deny({
  update: function() {
    return true;
  }
});
