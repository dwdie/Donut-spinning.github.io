const canvas = document.getElementById('donutCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let theta = 0;

function render() {
    const A = 1;
    const B = 1;
    const R1 = 1;
    const R2 = 2;
    const K2 = 5;
    const K1 = canvas.width * K2 * 3 / (8 * (A + B));

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 360; i++) {
        const phi = (i * Math.PI) / 180;
        for (let j = 0; j < 360; j++) {
            const t = (j * Math.PI) / 180;
            const cost = Math.cos(t);
            const sint = Math.sin(t);
            const costheta = Math.cos(theta);
            const sintheta = Math.sin(theta);
            const circleX = R1 + R2 + A * cost;
            const circleY = A * sint;

            const x = circleX * (costheta * cost - sint * sintheta) - circleY * costheta * sintheta;
            const y = circleX * (costheta * sint + cost * sintheta) + circleY * costheta * cost;
            const z = circleX * sint * sintheta + circleY * cost * sint;

            const ooz = 1 / z;
            const xp = canvas.width / 2 + K1 * ooz * x;
            const yp = canvas.height / 2 - K1 * ooz * y;

            if (xp >= 0 && xp < canvas.width && yp >= 0 && yp < canvas.height) {
                const intensity = cost * costheta * sint - costheta * sintheta - cost * costheta * sintheta - sint * costheta - sintheta;
                if (intensity > 0) {
                    const color = Math.floor(255 * intensity);
                    ctx.fillStyle = `rgb(${color},${color},${color})`;
                    ctx.fillRect(xp, yp, 1, 1);
                }
            }
        }
    }

    theta += 0.03;
    requestAnimationFrame(render);
}

render();
