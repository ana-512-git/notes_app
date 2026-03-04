const canvas = document.getElementById('noteCanvas');
        // 'alpha: false' is the secret for older tablets like the S6 Lite.
        // It saves massive amounts of GPU memory.
        const ctx = canvas.getContext('2d', { alpha: false });

        function init() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Fill white immediately so the GPU doesn't show black
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
        }

        let drawing = false;

        // Start
        canvas.addEventListener('pointerdown', (e) => {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        });

        // Draw
        canvas.addEventListener('pointermove', (e) => {
            if (!drawing) return;
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        });

        // Stop
        canvas.addEventListener('pointerup', () => {
            drawing = false;
        });

        window.addEventListener('resize', init);
        init();