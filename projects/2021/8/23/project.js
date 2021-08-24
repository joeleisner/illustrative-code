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
    function changeColor({ currentTarget }) {
        // For each button,...
        buttons.forEach(button => {
            // Change its aria-pressed state to true if it's the current target...
            button.setAttribute('aria-pressed', button === currentTarget);
            // ... and use its corresponding color to update the gameboy's color
            const { className: color } = button;
            gameboy.classList.toggle(color, button === currentTarget);
        });
    }

    // Finally, for each button, change the gameboy's color
    buttons.forEach(button => button.addEventListener('click', changeColor));
}

// When the DOM has loaded, start up the gameboy color picker
document.addEventListener('DOMContentLoaded', gameboyColorPicker);