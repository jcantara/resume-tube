player = null;
onYouTubeIframeAPIReady = function () {
  Session.set('readyToPlay', true)
  player = new YT.Player("player", {
      height: "400", 
      width: "600" 
  });
};

YT.load();

var recordTimerId = null;
// record our current position in playlist
Tracker.autorun(function() {
  playing = Session.get('playingPlaylist')
  if(playing !== null) {
    if(recordTimerId !== null) {
      Meteor.clearInterval(recordTimerId);
      recordTimerId = null;
    }
    Meteor.setInterval(function() {
      Meteor.call('update_playlist', playing._id, player.getPlaylistIndex(), player.getCurrentTime());
    }
    , 5000);
  }
});
