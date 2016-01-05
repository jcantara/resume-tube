Playlists = new Mongo.Collection("playlists");

if(Meteor.isServer){
  Meteor.publish("playlists", function() {
    return Playlists.find({});
  });
}

if(Meteor.isClient){
  Meteor.subscribe("playlists");
}
