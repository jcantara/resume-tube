Session.setDefault('playingPlaylistId', null);

Template.playlist.events = {
  'click a': function(evt, template) {
    Session.set('playingPlaylistId', this._id);
    evt.preventDefault();
  },
  'click .delete': function(evt, template) {
    if(confirm('Delete playlist "' + (this.title || this.list) + '"?')) {
      Meteor.call('remove_playlist', this._id);
    }
    evt.preventDefault();
  }
};

Template.playlist.helpers({
  displayName: function() {
    if(this.title) {
      return this.title
    } else {
      return this.list
    }
  },
  videoTime: function() {
    return getTimeFromSeconds(this.time) + " of " + getTimeFromSeconds(this.duration)
  },
  playlistCount: function() {
    return (this.index+1) + " of " + this.itemCount
  }
});

// from http://fiddle.jshell.net/YvE7x/2/
function getTimeFromSeconds(totalSeconds) {
  if (totalSeconds < 86400) {
      var dt = new Date("01/01/2000 0:00");
      dt.setSeconds(totalSeconds);
      return formatTime(dt);
  } else {
      return null;
  }
}

function formatTime(dt) {
  var h = dt.getHours(),
      m = dt.getMinutes(),
      s = dt.getSeconds(),
      r = "";
  if (h > 0) {
      r += (h > 9 ? h.toString() : "0" + h.toString()) + ":";
  }
  r += (m > 9 ? m.toString() : "0" + m.toString()) + ":"
  r += (s > 9 ? s.toString() : "0" + s.toString());
  return r;
}
