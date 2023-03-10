// Based on https://github.com/BrightcoveLearning/18750-automatically-set-caption-language/blob/d27d15d4d6078bc8e3d08ac7d2b28ad6d8660c27/plugin/auto-language.js
// Brightcove already has APIs to set language & caption lang using query params.
// Neither works...
videojs.registerPlugin('captions', function () {
  var player = this

  player.on('loadedmetadata', function () {
    var language = player.language().toLowerCase()
    var tracks = Array.from(player.textTracks()).filter(function (track) {
      return track.kind === 'caption'
    });

    // Prefer exact match, fall back to base lang.
    var preferredTrack = tracks.find(function (track) {
      return track.language.toLowerCase() === language
    }) || tracks.find(function (track) {
      return track.language.toLowerCase().slice(0, 2) === language.slice(0, 2)
    })

    if (preferredTrack) {
      tracks.forEach(function (track) {
        track.mode = 'disabled'
      });
      preferredTrack.mode = 'showing'
    }
  })
})
