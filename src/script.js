const dataText = [
    "Hi! My name is Spiros and I am from Greece.",
    "I am currently finishing writing my thesis",
]

// const typeSpeed = 
window.onload = () => {
    if (is_touch_enabled()) {
        console.log("touchscreen");
        document.addEventListener("touchstart", (event) => {
            playTime();
        })
    } else {
        console.log("NOT touchscreen");
        document.addEventListener('keyup', (event) => {
            playTime();
        })
    }
}

const playTime = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log("Play time!");
}

function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}