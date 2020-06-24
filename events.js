videojs.registerPlugin('events', function() {
  if (window.parent === window) return

  var player = this
  var events = ['durationchange', 'firstplay', 'play', 'pause', 'timeupdate', 'waiting', 'playing', 'seeking', 'seeked', 'ended']

  events.forEach(function(event) {
    player.on(event, function() {
      window.parent.postMessage({
        event: event,
        duration: player.duration(),
        currentTime: player.currentTime(),
        paused: player.paused(),
      }, '*')
    })
  })
});
