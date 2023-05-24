import '../styles/PikaCard.css';
import React, { useState } from 'react';

const CardComponent = () => {
    const [style, setStyle] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const handleCardMouseMove = (e) => {
        const pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
        e.preventDefault();
        if (e.type === 'touchmove') {
            pos[0] = e.touches[0].clientX;
            pos[1] = e.touches[0].clientY;
        }

        const $card = e.currentTarget;
        const l = pos[0];
        const t = pos[1];
        const h = $card.offsetHeight;
        const w = $card.offsetWidth;
        const px = Math.abs(Math.floor((100 / w) * l) - 100);
        const py = Math.abs(Math.floor((100 / h) * t) - 100);
        const pa = 50 - px + (50 - py);
        const lp = 50 + (px - 50) / 1.5;
        const tp = 50 + (py - 50) / 1.5;
        const px_spark = 50 + (px - 50) / 7;
        const py_spark = 50 + (py - 50) / 7;
        const p_opc = 20 + Math.abs(pa) * 1.5;
        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * 0.5;

        const grad_pos = `background-position: ${lp}% ${tp}%;`;
        const sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
        const opc = `opacity: ${p_opc / 100};`;
        const tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

        const newStyle = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */ 
    `;

        setStyle(newStyle);

        if (e.type === 'touchmove') {
            return false;
        }
        clearTimeout(timeoutId);
    };

    const handleCardMouseLeave = (e) => {
        const $card = e.currentTarget;
        setStyle('');
        const newTimeoutId = setTimeout(() => {
            $card.classList.add('animated');
        }, 2500);
        setTimeoutId(newTimeoutId);
    };

    const handleCardClick = () => {
        // Handle card click logic here
    };

    return (
        <div
            className="card pika animated"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            onTouchMove={handleCardMouseMove}
            onTouchEnd={handleCardMouseLeave}
            onTouchCancel={handleCardMouseLeave}
            onClick={handleCardClick}
            style={{ transform: 'rotateX(0deg) rotateY(0deg)' }}
        >
            <style>{style}</style>
        </div>
    );
};

export default CardComponent;
