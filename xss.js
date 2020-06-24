// Loads any script passed as a xss query param.
(function() {
  var matches = /[?&]xss(=([^&#]*)|&|#|$)/.exec(window.location.search)
  if (!matches || !matches[2]) return
  var script = document.createElement('script')
  script.src = decodeURIComponent(matches[2])
  document.body.appendChild(script)
})();
