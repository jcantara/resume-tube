Meteor.startup(function () {

ServiceConfiguration.configurations.upsert(
  { service: "google" },
  {
    $set: {
      clientId: Meteor.settings.googleClientId,
      loginStyle: "popup",
      secret: Meteor.settings.googleClientSecret
    }
  }
);

// ensure indexes:
Playlists._ensureIndex({ "userId": 1});

});
