const canvas = document.getElementById('noteCanvas');
// 'desynchronized' reduces the 'ink-chasing-the-pen' lag
const ctx = canvas.getContext('2d', { desynchronized: true });

// Setup canvas size
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000'; // Black ink
}

window.addEventListener('resize', resize);
resize();

let isDrawing = false;

// 1. Start Drawing
canvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
});

// 2. The Actual Ink Flow
canvas.addEventListener('pointermove', (e) => {
    if (!isDrawing) return;

    // Use pressure if available, otherwise default to 2px
    ctx.lineWidth = e.pressure > 0 ? e.pressure * 8 : 2;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    // This helps the 'desynchronized' hint stay smooth
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
});

// 3. Stop Drawing
canvas.addEventListener('pointerup', () => {
    isDrawing = false;
});