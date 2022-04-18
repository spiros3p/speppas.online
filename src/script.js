const initDataText = [
    "Welcome!",
    "This is a temporary version of my website..."
]

const dataText = [
    "- My name is Spiros, I am 25 yo and I live in Greece.",
    "- I am an electrical and computer engineer student at the University of Patras in Greece.",
    "- I am currently finishing writing my thesis, that I developed an application for.",
    "- In the meantime I am working a 9-5 as a Web Developer at the NCSR Demokritos since July 2021.",
    "- Did I mention that I am also trading NFTs, as a second job, for the past year?",
    "Feel free to check my personal projects on github and my CV below."
]

const dataLinks = {
    'https://github.com/spiros3p' : '<i class="fa-brands fa-github"></i>',
    './data/CV.pdf' : '<i class="fa-solid fa-arrow-up-right-from-square"></i>'
}

const typeSpeed = 60;
let index = 0;
let playTimeStarted = false;
let playTimeReady = false;

// let lastTurn = false;
let indicationText = document.createElement("span");
indicationText.setAttribute("id", "indication-text");
let containerText = document.getElementById('text-container');
let containerLink = document.getElementById('link-container');

let soundButton = document.getElementById('sound-button');
let typingSound = document.getElementById('sound');

window.onload = async () => {
    try {
        soundButton.addEventListener('click', (event)=>{
            toggleSound();
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
        if (typingSound.muted === true){
            toggleSound();
        }
        if (!playTimeStarted && playTimeReady) {
            playTimeStarted = true;
            indicationText.classList.remove('show');
            containerText.classList.add('hide');
            await timeout(800);
            containerText.classList.remove('hide');
            containerText.innerHTML = '';
            await timeout(600);
            await showText(dataText);
            await addLinks();
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
            // pElement.innerHTML = '&nbsp&nbsp&nbsp';
            pElement.appendChild(spanElement);
            containerText.appendChild(pElement);
            await timeout(600);
            pElement.classList.remove('on-hold');
            // await timeout(100);
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
    for (link in dataLinks){
        let aElement = document.createElement("a");
        aElement.classList.add('link', 'col-auto', 'mx-3', 'my-2');
        aElement.setAttribute('href', link);
        aElement.setAttribute('target', '_blank');
        aElement.innerHTML = `${link.split('//')[1]?link.split('//')[1]:link.split('/').pop()} ${dataLinks[link]}`;
        containerLink.appendChild(aElement);
    }
    await timeout(800);
    containerLink.classList.add('show');
}

const toggleSound = () => {
    if (typingSound.muted === true){
        soundButton.innerHTML = "<i class='fa-solid fa-volume-high'></i>";
        typingSound.muted = false;
    }else{
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