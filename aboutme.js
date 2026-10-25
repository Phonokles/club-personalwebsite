const below = document.querySelector('.below');
const items = document.querySelectorAll('.hobby li');
const panels = document.querySelectorAll('.panel');

function show(id) {
    panels.forEach(p => p.classList.toggle('on', p.id === id));
    items.forEach(li => li.classList.toggle('active', li.dataset.show === id));
    if (id === 'music') loadSpotify();
}

items.forEach(li => {
    li.addEventListener('mouseenter', () => show(li.dataset.show));
    li.addEventListener('click', () => show(li.dataset.show));
});

below.addEventListener('mouseleave', () => show('now'));

function loadSpotify() {
    document.querySelectorAll('.spotify').forEach(f => {
        if (f.src) return;
        const id = f.dataset.song.split('/track/')[1]?.split('?')[0];
        if (!id || id.startsWith('HIER')) { f.style.display = 'none'; return; }
        f.src = 'https://open.spotify.com/embed/track/' + id;
    });
}