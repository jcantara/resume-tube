Session.setDefault('playingPlaylistId', null);

Template.playlist.events = {
  'click a': function(evt, template) {
    Session.set('playingPlaylistId', this._id);
    evt.preventDefault();
  },
  'click .delete': function(evt, template) {
    if(confirm("Delete this playlist?")) {
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
  }
});
