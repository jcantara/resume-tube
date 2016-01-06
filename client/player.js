//
player = null;
onYouTubeIframeAPIReady = function () {
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
  if(typeof(playing) !== 'undefined' && playing !== null) {
    if(recordTimerId !== null) {
      Meteor.clearInterval(recordTimerId);
      recordTimerId = null;
    }
    id = playing._id;
    if(player !== null){
      index = player.getPlaylistIndex();
      time = player.getCurrentTime();
    } else {
      index = -1;
      time = 0;
    }
    if(index != -1) {
      //
      recordTimerId = Meteor.setInterval(function() {
        index = player.getPlaylistIndex();
        time = player.getCurrentTime();
        Meteor.call('update_playlist', id, index, time);
      }
      , 5000);
    }
  }
});
