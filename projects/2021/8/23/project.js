// JS cookie library
import Cookies from 'js-cookie';

// The gameboy color picker
function gameboyColorPicker() {
    document.removeEventListener('DOMContentLoaded', gameboyColorPicker);

    // Attempt to grab the gameboy...
    const gameboy = document.getElementById('gameboy');
    // ... and if it doesn't exist, do nothing else
    if (!gameboy) return;

    // Next, attempt to grab the picker...
    const picker = document.getElementById('picker');
    // ... and if it doesn't exist, do nothing else

    // Next, attempt to grab the picker buttons...
    const buttons = Array.from(
        picker.querySelectorAll('button')
    );
    // ... and if none exist, do nothing else
    if (!buttons.length) return;

    // Change the gameboy's color
    function changeColor({ color, currentTarget }) {
        // If a color has been specified, set the current target to a button with a matching color class
        if (color) currentTarget = buttons.find(({ className }) => className === color);
        // For each button,...
        buttons.forEach(button => {
            // First, store whether the current button is active
            const active = button === currentTarget;

            // Next, change its aria-pressed state to true if it's active...
            button.setAttribute('aria-pressed', active);
            // ... and use its corresponding color to update the gameboy's color
            const { className: color } = button;
            gameboy.classList.toggle(color, active);

            // Finally, if it's active, save the color as a cookie
            if (active) Cookies.set('gameboy--color', color, { expires: 365 });
        });
    }

    // Attempt to grab a saved gameboy color...
    const color = Cookies.get('gameboy--color');
    // ... and if it exists, change the gameboy's color to it
    if (color) changeColor({ color });

    // Finally, for each button, change the gameboy's color
    buttons.forEach(button => button.addEventListener('click', changeColor));
}

// When the DOM has loaded, start up the gameboy color picker
document.addEventListener('DOMContentLoaded', gameboyColorPicker);