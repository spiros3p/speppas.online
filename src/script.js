const initDataText = [
    "Welcome!",
    "This is a temporary version of my website..."
]

const dataText = [
    "- My name is Spiros, I am 25 yo and I live in Greece.",
    "- I am an electrical and computer engineering student at the University of Patras in Greece.",
    "- I am currently finishing writing my thesis, that I developed an application for.",
    "- In the meantime I am working a 9-5 as a Web Developer at the NCSR Demokritos since July 2021.",
    "- Did I mention that I have also been trading NFTs, as a second job, for the past year?",
    "Feel free to check out my personal projects on github, my CV or contact me below.",
]

const dataLinks = {
    'https://github.com/spiros3p': '<i class="fa-brands fa-github"></i>',
    './data/CV.pdf': '<i class="fa-solid fa-arrow-up-right-from-square"></i>',
    'mailto:spiros3p@gmail.com': '<i class="fa-solid fa-envelope"></i>',
}

let typeSpeed = 60;
let index = 0;
let playTimeStarted = false;
let playTimeReady = false;

let indicationText = document.createElement("span");
indicationText.setAttribute("id", "indication-text");
let containerText = document.getElementById('text-container');
let containerLink = document.getElementById('link-container');

let soundButton = document.getElementById('sound-button');
let typingSound = document.getElementById('sound');

let root = document.documentElement;
let themeButton = document.getElementById('switch-theme');
let themeIcon = document.querySelector('button#switch-theme i');

let speedButton = document.getElementById('speed-button');
let superSpeedIcon = document.querySelector('button#speed-button i.fa-forward-step');

window.onload = async () => {
    try {
        if (Math.floor(Math.random() * 2) === 1) {
            toggleTheme();
        }
        soundButton.addEventListener('click', (event) => {
            toggleSound();
        })
        themeButton.addEventListener('click', (event) => {
            toggleTheme();
        })
        speedButton.addEventListener('click', (event) => {
            toggleSpeed();
        })

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
            if (typingSound.muted === true) {
                toggleSound();
            }
            playTimeStarted = true;
            indicationText.classList.remove('show');
            containerText.classList.add('hide');
            await timeout(800);
            containerText.classList.remove('hide');
            containerText.innerHTML = '';
            await timeout(600);
            await showText(dataText);
            await addLinks();
            typingSound.remove();
        }
    } catch (e) {
        console.error(e);
    }
}

const showText = async (dataText) => {
    try {
        for (index in dataText) {
            typingSound.play();
            let pElement = document.createElement("p");
            let spanElement = document.createElement("span");
            pElement.classList.add('on-hold');
            pElement.appendChild(spanElement);
            containerText.appendChild(pElement);
            await timeout(600);
            pElement.classList.remove('on-hold');
            for (let i = 1; i <= dataText[index].length; i++) {
                spanElement.innerText = spanElement.innerHTML + dataText[index].substring(i - 1, i);
                await timeout(typeSpeed);
            }
            pElement.classList.add('on-hold');
            typingSound.pause();
            await timeout(typeSpeed + 400);
        }
    } catch (e) {
        console.error(e);
    }
}

async function addLinks() {
    for (link in dataLinks) {
        let aElement = document.createElement("a");
        aElement.classList.add('link', 'col-auto', 'mx-3', 'my-2');
        aElement.setAttribute('href', link);
        aElement.setAttribute('target', '_blank');
        if (link.indexOf('mailto') !== -1) {
            aElement.innerHTML = `Contact Me ${dataLinks[link]}`
        } else {
            aElement.innerHTML = `${link.split('//')[1] ? link.split('//')[1] : link.split('/').pop()} ${dataLinks[link]}`;
        }
        containerLink.appendChild(aElement);
    }
    await timeout(800);
    containerLink.classList.add('show');
}

const toggleSpeed = () => {
    if (typeSpeed === 60) {
        typeSpeed = 20;
        typingSound.playbackRate = 2.4;
        superSpeedIcon.classList.remove('d-none');
    } else {
        typingSound.playbackRate = 1;
        typeSpeed = 60;
        superSpeedIcon.classList.add('d-none');
    }
}

const toggleTheme = () => {
    if (themeButton.classList.contains('dark')) {
        themeButton.classList.remove('dark');
        root.style.setProperty('--primary-color', '#000000');
        root.style.setProperty('--secondary-color', '#ffffff');
        root.style.setProperty('--alternative-color', '#464646');
        root.style.setProperty('--sound-button', '#000000');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeButton.classList.add('dark');
        // root.style.setProperty('--primary-color', '#37ff62'); //green
        root.style.setProperty('--primary-color', '#f3f3f3'); //white
        root.style.setProperty('--secondary-color', '#1f1f1f');
        root.style.setProperty('--alternative-color', '#c0c0c0');
        root.style.setProperty('--sound-button', '#ffffff');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
}

const toggleSound = () => {
    if (typingSound.muted === true) {
        soundButton.innerHTML = "<i class='fa-solid fa-volume-high'></i>";
        typingSound.muted = false;
    } else {
        soundButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        typingSound.muted = true;
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