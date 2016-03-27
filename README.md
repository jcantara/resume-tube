# resume-tube
Resume youtube playlists where you left off. 

Now hosted at https://resume-tube.emjas.net

To run your own instance, copy `settings.json.example` to `settings.json`; edit it to have your YouTube API key (optional, but the playlists won't display anything useful otherwise) and run:

```meteor --settings settings.json```

This is a Meteor JS project to allow you to watch a youtube playlist, and resume where you left off automatically. It keeps track of where you are in a playlist and will start playing the video again at the same location when you next return. 

I created this because there are some long playlists that I like to watch, and keeping track of where I was can be difficult. Sometimes youtube will mark a video as "watched" but it's inconsistent, and if I stop halfway through a video it doesn't remember that. 
