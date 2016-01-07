Session.setDefault('playingPlaylist', null);

Template.playlist.events = {
  'click a': function(evt, template) {
    player.loadPlaylist({list: this.list, index: this.index, startSeconds: this.time});
    Session.set('playingPlaylist', this);
    evt.preventDefault();
  },
  'click .delete': function(evt, template) {
    if(confirm("Delete this playlist?")) {
      Meteor.call('remove_playlist', this._id);
    }
    evt.preventDefault();
  }
};
