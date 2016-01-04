Playlists = new Mongo.Collection("playlists");

getJsonFromUrl = function(query) {
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.replace("+"," ");
    var eq = part.indexOf("=");
    var key = eq>-1 ? part.substr(0,eq) : part;
    var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    var from = key.indexOf("[");
    if(from==-1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf("]");
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}

if (Meteor.isClient) {

  Session.setDefault('playingPlaylist', null);

  var player;
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
        Playlists.update(playing._id, {$set: {index: player.getPlaylistIndex(), time: player.getCurrentTime()}});
      }
      , 5000)
    }
  });

  Template.listPlaylists.helpers({
    playlists: function() {
      return Playlists.find({});
    }
  });

  Template.addNewPlaylist.events = {
    'keypress input[name="playlist-url"]': function (evt, template) {
      if (evt.which === 13) {
        var url = template.find('input[name="playlist-url"]').value;
        urlJson = getJsonFromUrl(url);
        Playlists.insert({list: urlJson.list, index: urlJson.index});
      }
    }
  };

  Template.playlist.events = {
    'click a': function(evt, template) {
      player.loadPlaylist({list: this.list, index: this.index, startSeconds: this.time});
      Session.set('playingPlaylist', this);
      evt.preventDefault();
    }
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
