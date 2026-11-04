// Progressive enhancement: swap a YouTube link for a privacy-friendly embed on click.
// Without JS the link still opens the video on YouTube.
(function () {
  document.addEventListener('click', function (event) {
    var link = event.target instanceof Element ? event.target.closest('a.video-link[data-video-id]') : null;
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    var id = link.getAttribute('data-video-id');
    if (!id || !/^[\w-]{6,20}$/.test(id)) return;
    event.preventDefault();
    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1';
    frame.title = (link.querySelector('.video-title') || link).textContent.trim();
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.loading = 'lazy';
    link.replaceWith(frame);
    frame.focus();
  });
})();
