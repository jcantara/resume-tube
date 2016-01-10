//
var player = null;
Session.set('playerReady', false);
Session.setDefault('playerReady', false);
Session.setDefault('intervalId', null);
Session.setDefault('playerPaused', false);

onYouTubeIframeAPIReady = function () {
  player = new YT.Player("player", {
      height: "400", 
      width: "600",
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
};

function onPlayerReady(evt) {
  Session.set('playerReady', true);
}

function onPlayerStateChange(evt) {
  intervalId = Session.get('intervalId');
  playerState = evt.data;
  // always stop our periodic playlist update if player changes state, we will start it again if player is playing
  if (intervalId !== null) {
    Meteor.clearInterval(intervalId);
    Session.set('intervalId', null);
  }
  // always assume player isn't paused, re-set later if it is
  Session.set('playerPaused', false);
  switch(playerState) {
    case 0:
      updatePlaylist();
      break;
    case 1:
      // playing
      updatePlaylist(); // save now and every 5 seconds
      intervalId = Meteor.setInterval(updatePlaylist,5000);
      Session.set('intervalId', intervalId);
      break;
    case 2:
      // paused, just save it here so it resumes exactly
      updatePlaylist();
      Session.set('playerPaused', true);
      break;
    case 3:
      // buffering, also save it same as paused
      updatePlaylist();
      break;
    case 5:
      // video queued, assume still paused
      Session.set('playerPaused', true);
  }
}

function updatePlaylist() {
  playlistId = Session.get('playingPlaylistId');
  index = player.getPlaylistIndex();
  time = player.getCurrentTime();
  if(index >=0) { // is -1 when watching related video or "something else"
    Meteor.call('update_playlist', playlistId, index, time);
  }
}

Tracker.autorun(function() {
  playingId = Session.get('playingPlaylistId');
  ready = Session.get('playerReady');
  if(ready) {
    if(typeof(playingId) !== 'undefined' && playingId !== null) {
      playing = Playlists.findOne(playingId)
      currentlyPlaying = player.getPlaylistId();
      if(playing.list !== currentlyPlaying) {
        if(Session.get('playerPaused')) {
          player.cuePlaylist({list: playing.list, index: playing.index, startSeconds: playing.time});
        } else {
          player.loadPlaylist({list: playing.list, index: playing.index, startSeconds: playing.time});
        }
      }
    }
  }
});

Template.player.onRendered(function() {
  YT.load();
});
