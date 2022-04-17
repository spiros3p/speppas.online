const initDataText = [
    "Welcome!",
    // "My name is Spiros.",
    // "This is a temporary version of my website..."
]

const dataText = [
    "My name is Spiros and I am from Greece.",
    "I am currently finishing writing my thesis",
]

const dataLinks = {
    'https://github.com/spiros3p' : '<i class="fa-brands fa-github"></i>'
}

const typeSpeed = 150;
let index = 0;
let playTimeStarted = false;
let playTimeReady = false;

let indicationText = document.createElement("span");
indicationText.setAttribute("id", "indication-text");
let containerText = document.getElementById('text-container');

window.onload = async () => {
    try {
        addLinks();
        if (is_touch_enabled()) {
            indicationText.innerText = "tap the screen to continue"
            console.debug("touchscreen detected");
            document.addEventListener("touchstart", (event) => {
                playTime();
            })
        } else {
            indicationText.innerText = "press any key to continue"
            console.info("touchscreen NOT detected");
            document.addEventListener('keyup', (event) => {
                playTime();
            })
        }
        await timeout(500);
        await initialize();
    } catch (e) {
        console.error(e);
    }
}

const initialize = async () => {
    await showText(initDataText);
    containerText.appendChild(indicationText);
    await timeout(50);
    indicationText.classList.add('show');
    playTimeReady = true;
}

const playTime = async () => {
    try {
        if (!playTimeStarted && playTimeReady) {
            playTimeStarted = true;
            indicationText.classList.remove('show');
            containerText.classList.add('hide');
            await timeout(800);
            containerText.classList.remove('hide');
            containerText.innerHTML = '';
            await timeout(600);
            await showText(dataText);
        }
    } catch (e) {
        console.error(e);
    }
}

const showText = async (dataText) => {
    try {
        for (index in dataText) {
            let pElement = document.createElement("p");
            pElement.classList.add('on-hold');
            containerText.appendChild(pElement);
            await timeout(1500);
            pElement.classList.remove('on-hold');
            for (let i = 1; i <= dataText[index].length; i++) {
                pElement.innerText = pElement.innerHTML + dataText[index].substring(i - 1, i);
                await timeout(typeSpeed);
            }
            pElement.classList.add('on-hold');
            await timeout(typeSpeed + 800);
        }
    } catch (e) {
        console.error(e);
    }
}

function addLinks() {
    for (link in dataLinks){
        console.log(dataLinks[link]);
        let aElement = document.createElement("a");
        aElement.classList.add('link');
        aElement.setAttribute('href', link);
        aElement.setAttribute('target', '_blank');
        aElement.innerHTML = link.split('//')[1] +" "+ dataLinks[link];
        containerText.appendChild(aElement);
    }
}

function is_touch_enabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}