export function burgerRain() {

    const canvas = document.getElementById('burger-rain') as HTMLCanvasElement | null;

    if (canvas) {
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        canvas.width = window.innerWidth;

        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {

            canvas!.width = window.innerWidth;

            canvas!.height = window.innerHeight;

        });

        const EMOJI = '🍔';

        const COUNT = 32;

        const burgers = Array.from({ length: COUNT }, () => ({

            x: Math.random() * canvas.width,

            y: Math.random() * -canvas.height,

            size: 17 + Math.random() * 28,

            speed: 0.7 + Math.random() * 1.2,

            drift: (Math.random() - 0.5) * 0.4,

            rotation: Math.random() * Math.PI * 2,

            rotSpeed: (Math.random() - 0.5) * 0.03,

        }));


        function draw() {

            ctx.clearRect(0, 0, canvas!.width, canvas!.height);

            for (const b of burgers) {

                ctx.save();

                ctx.translate(b.x, b.y);

                ctx.rotate(b.rotation);

                ctx.font = `${b.size}px serif`;

                ctx.textAlign = 'center';

                ctx.textBaseline = 'middle';

                ctx.fillText(EMOJI, 0, 0);

                ctx.restore();



                b.y += b.speed;

                b.x += b.drift;

                b.rotation += b.rotSpeed;



                if (b.y > canvas!.height + b.size) {

                    b.y = -b.size * 2;

                    b.x = Math.random() * canvas!.width;

                }

            }

            requestAnimationFrame(draw);

        }

        draw();
    }
}