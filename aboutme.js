
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

const canvas = document.querySelector('.pendel');
const ctx = canvas.getContext('2d');
let winkel = 1.0;
let speed = 0;
const g = 9.81;
const l = 1.5;
let last = performance.now();

function pendel(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    speed += -(g / l) * Math.sin(winkel) * dt;
    winkel += speed * dt;

    const w = canvas.width;
    const ax = w / 2, ay = 10;
    const len = 140;
    const bx = ax + Math.sin(winkel) * len;
    const by = ay + Math.cos(winkel) * len;

    ctx.clearRect(0, 0, w, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(ax - 40, ay);
    ctx.lineTo(ax + 40, ay);
    ctx.moveTo(ax, ay);
    ctx.lineTo(bx, by);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx, by, 18, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, .7)';
    ctx.fill();
    ctx.stroke();

    requestAnimationFrame(pendel);
}
requestAnimationFrame(pendel);

// reinklicken schubst das pendel an
canvas.addEventListener('click', () => { speed += 2; });