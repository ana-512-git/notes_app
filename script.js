const canvas = document.getElementById('noteCanvas');

// FIX 1: Remove 'desynchronized'. It is causing the black screen.
const ctx = canvas.getContext('2d');

function resize() {
    // FIX 2: Handle High-DPI (Retina) screens properly to prevent GPU lag
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    ctx.scale(ratio, ratio);
    
    // Reset styles after resizing
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
}

window.addEventListener('resize', resize);
resize();

let isDrawing = false;

canvas.addEventListener('pointerdown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
});

canvas.addEventListener('pointermove', (e) => {
    if (!isDrawing) return;

    // Use pressure if available
    ctx.lineWidth = e.pressure > 0 ? e.pressure * 8 : 3;

    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    
    // FIX 3: Force the browser to 'paint' the stroke immediately
    window.requestAnimationFrame(() => {});
});

canvas.addEventListener('pointerup', () => {
    isDrawing = false;
});