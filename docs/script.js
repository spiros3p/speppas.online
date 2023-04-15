const initDataText = [
    "Welcome!",
    "This is a temporary version of my website..."
]

const dataText = [
    "- My name is Spiros, I am 26 yo living in Brussels, Belgium",
    "- I have graduated from the Electrical and Computer Engineering department of the University of Patras, Greece.",
    "- For my thesis, I developed a GUI, using angular and nodeJs, for configuring 5G base stations in private 5G networks.",
    "- In the meantime, I worked full-time as a Web Developer at the NCSR Demokritos between July 2021 - June 2022.",
    "- Since September 2022, I am working as a junior software engineer at Engie Impact.",
    "- At Engie Impact, I am part of the devOps team of the Prosumer project, which aims to assist entities in designing a zero carbon energy investment strategy!",
    "- Did I mention that I have also been trading NFTs on the WAX and FLOW blockchains, as a side hustle, for the past 2 year?",
    "Feel free to check out my personal projects on github, my CV, my Thesis paper or contact me below.",
]

const dataLinks = {
    'https://github.com/spiros3p': '<i class="fa-brands fa-github"></i>',
    './data/CV.pdf': '<i class="fa-solid fa-arrow-up-right-from-square"></i>',
    'mailto:spiros3p@gmail.com': '<i class="fa-solid fa-envelope"></i>',
    './data/thesis.pdf': '<i class="fa-solid fa-arrow-up-right-from-square"></i>'
}

let slow = 55;
let fast = 20;
let typeSpeed = slow;
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
let primaryColor = '#f3f3f3';

let lidiaButton = document.getElementById('lidia-hidden-switch');

let speedButton = document.getElementById('speed-button');
let superSpeedIcon = document.querySelector('button#speed-button i.fa-forward-step');

window.onload = async () => {
    try {
        if (Math.floor(Math.random() * 2) === 1) {
            if (Math.floor(Math.random() * 2) === 1) {
                primaryColor = '#37ff62';
            }
            toggleTheme();
        }
        soundButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleSound();
        })
        themeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleTheme();
        })
        speedButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleSpeed();
        })
        lidiaButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleLidia();
        })

        if (is_touch_enabled()) {
            indicationText.innerText = "tap the screen to continue..."
            console.debug("touchscreen detected");
            document.addEventListener("click", (event) => {
                playTime();
            })
        } else {
            indicationText.innerText = "press any key to continue..."
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
            let pElement = document.createElement("p");
            let spanElement = document.createElement("span");
            pElement.classList.add('on-hold');
            pElement.appendChild(spanElement);
            containerText.appendChild(pElement);
            await timeout(typeSpeed*6);
            typingSound.play();
            await timeout(50);
            pElement.classList.remove('on-hold');
            for (let i = 1; i <= dataText[index].length; i++) {
                spanElement.innerText = spanElement.innerHTML + dataText[index].substring(i - 1, i);
                await timeout(typeSpeed);
            }
            pElement.classList.add('on-hold');
            typingSound.pause();
            await timeout(typeSpeed + typeSpeed*5);
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
    if (typeSpeed === slow) {
        typeSpeed = fast;
        typingSound.playbackRate = (slow/fast)-0.4;
        superSpeedIcon.classList.remove('d-none');
    } else {
        typingSound.playbackRate = 1;
        typeSpeed = slow;
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
        root.style.setProperty('--primary-color', primaryColor); //white
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

const toggleLidia = () => {
    if (root.style.getPropertyValue('--primary-color')=='#ff6dff'){
        if (root.style.getPropertyValue('--secondary-color')=='#1f1f1f'){
            root.style.setProperty('--primary-color', primaryColor);
        }else{
            root.style.setProperty('--primary-color', '#000');
        }
    }else{
        root.style.setProperty('--primary-color', '#ff6dff');
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
