# resume-tube
Resume youtube playlists where you left off. 

To run your own instance, copy `settings.json.example` to `settings.json`; edit it to have your YouTube API key (optional, but the playlists won't display anything useful otherwise) and run:

```meteor --settings settings.json```

This is a Meteor JS project to allow you to watch a youtube playlist, and resume where you left off automatically. It keeps track of where you are in a playlist and will start playing the video again at the same location when you next return. 

I created this because there are some long playlists that I like to watch, and keeping track of where I was can be difficult. Sometimes youtube will mark a video as "watched" but it's inconsistent, and if I stop halfway through a video it doesn't remember that. 

Currently the status of this project is "if you want to use it you need to self-host". It works well-enough to fill a need I had when watching long playlists with long videos. I plan on eventually hosting this somewhere the general public can make use of it without self-hosting, but it requires a few more things: logins and the notion of users (and playlists they 'own'); some UI refinement (It's somewhat-ugly, if functional currently, I'm not a designer though, but it also needs a little more information about the playlists other than ID, probably "at time X of video Y out of total Z", and some handling of 'user is at the end of the playlist' etc).
