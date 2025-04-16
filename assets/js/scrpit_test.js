/**
 * Point culture (en Français car je suis un peu obligé): 
 * Dans ce genre de jeu, un mot equivaut a 5 caractères, y compris les espaces. 
 * La precision, c'est le pourcentage de caractères tapées correctement sur toutes les caractères tapées.
 * 
 * Sur ce... Amusez-vous bien ! 
 */
const textDisplay = document.querySelector('.text_display')
const textInput = document.querySelector('.text_input')
const chrono = document.querySelector('.timer')
const wpm = document.getElementById('wpm')
const accuracy = document.getElementById('accuracy')
const results = document.querySelector('.results')
const finalWpm = document.getElementById('final_wpm')
const finalAccuracy = document.getElementById('final_accuracy')
const totalWords = document.getElementById('total_words')
const totalCharsElement = document.getElementById('total_chars')
const btnToggle = document.querySelector(".btn_toggle")
const icon = btnToggle.querySelector("i")
const Login = document.querySelector('.login_button')
const restartBtn = document.querySelector('.restart_btn');

let currentText = "";
let userInput = "";
let currentCharIndex = 0;
let correctChars = 0;
let totalChars = 0;
let isPlaying = false;
let startTime;
let timeLeft = 30;
let timer;

Login.addEventListener("click", function(){
    Login.value = "..."
    setTimeout(function(){
        Login.value = "Login"
    }, 1400)
    setTimeout(function(){
        window.location.href = "../html/login.html"
    },1400)
})

btnToggle.addEventListener("click", () => {
  const body = document.body;

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");

    icon.classList.remove("bx-moon");
    icon.classList.add("bx-sun");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");

    icon.classList.remove("bx-sun");
    icon.classList.add("bx-moon");
  }
});

const texts = [
    "The sun dipped below the horizon, casting a warm golden glow across the quiet village. Children played in the streets, laughter echoing through the alleys as the scent of fresh bread drifted from the bakery nearby.",
    "In the heart of the ancient forest, a hidden path wound between towering trees, their leaves whispering secrets in the breeze. A fox darted through the underbrush, its eyes glinting with curiosity and caution.",
    "A gentle rain began to fall as the train pulled out of the station, the rhythmic clatter of wheels on the tracks blending with the distant hum of the city. Through the window, a young woman watched the raindrops race each other down the glass.",
    "The market square buzzed with life, stalls overflowing with colorful fruits, spices, and handmade goods. Musicians played lively tunes while merchants called out their wares, creating a symphony of sound and movement.",
    "High above the mountains, an eagle soared effortlessly through the clouds, its sharp gaze scanning the valleys below. Snow glittered on the peaks, untouched and silent, while the wind whispered ancient songs across the ridges.",
    "The lighthouse stood tall against the raging storm, its beam sweeping across the dark ocean. Waves crashed against the rocks below, and the keeper watched silently, knowing the light guided sailors home through the chaos.",
    "A small café nestled between bookshops on a narrow street welcomed visitors with the rich aroma of coffee and pastries. Soft music played inside while people read, wrote, and dreamed at corner tables.",
    "Beyond the city walls, golden fields swayed under the late summer sun. Farmers worked quietly among the crops, their hands steady and practiced, while birds circled lazily in the bright blue sky.",
    "She wandered through the museum, her footsteps echoing across marble floors. Each painting seemed to speak in hushed tones, telling stories of lost time, forgotten places, and dreams preserved in brushstrokes.",
    "Beneath the stars, a group of friends gathered around a campfire, sharing stories and roasting marshmallows. The fire crackled as the night deepened, wrapping them in warmth and the comfort of familiar laughter."
  ];
  

const getRandomText = () => {
  return texts[Math.floor(Math.random() * texts.length)];
};

function init() {
  currentText = getRandomText();
  displayText();
  textInput.addEventListener('input', processTypingInput);
  textInput.addEventListener('keydown', beginOnFirstInput);
  restartBtn.addEventListener('click', restartGame);
}

function displayText() {
    textDisplay.innerHTML = '';

    for (let i = 0; i < currentText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.classList.add('char');
        charSpan.textContent = currentText[i];

        if (i < userInput.length) {
            if (userInput[i] === currentText[i]) {
                charSpan.classList.add('correct');
            } else {
                charSpan.classList.add('incorrect');
            }
        }

        if (i === userInput.length) {
            charSpan.classList.add('current');
        }

        textDisplay.appendChild(charSpan);
    }
}

function beginOnFirstInput() {
    if (!isPlaying) {
        startGame(); 
        textInput.removeEventListener('keydown', beginOnFirstInput); 
    }
}

function startGame() {
    isPlaying = true;
    startTime = new Date().getTime();
    timeLeft = 30;
    currentCharIndex = 0;
    correctChars = 0;
    totalChars = 0;
    userInput = '';
    textInput.placeholder = "Type here...";
    results.style.display = 'none';
    textInput.value = '';
    timer = setInterval(updateTimer, 1000);
    updateStats();
    displayText();
}

function processTypingInput(e) {
    userInput = textInput.value; 

    correctChars = 0;
    totalChars = Math.min(userInput.length, currentText.length); 

    for (let i = 0; i < totalChars; i++) {
        if (userInput[i] === currentText[i]) {
            correctChars++; 
        }
    }

    displayText(); 
    updateStats(); 

    if (userInput.length >= currentText.length) {
        currentText = texts[Math.floor(Math.random() * texts.length)]; 
        userInput = '';
        textInput.value = '';
        displayText();
    }
}

function updateTimer() {
    timeLeft--; 
    chrono.textContent = timeLeft + 's';

    if (timeLeft <= 0) {
        endGame(); 
    }
}

function updateStats() {
    const currentTime = new Date().getTime();
    const typingTime = (currentTime - startTime) / 1000 / 60; 
    
    const words = correctChars / 5; 
    const wpmValue = Math.round(words / typingTime) || 0; 
    const accuracyValue = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0; 

    wpm.textContent = wpmValue; 
    accuracy.textContent = accuracyValue + '%'; 
}

function endGame() {
    clearInterval(timer);
    isPlaying = false; 
    textInput.disabled = true; 

    const typingTime = 0.5; 
    const words = correctChars / 5;
    const wpm = Math.round(words / typingTime) || 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    finalWpm.textContent = wpm; 
    finalAccuracy.textContent = accuracy + '%'; 
    totalWords.textContent = Math.round(words); 
    totalCharsElement.textContent = totalChars; 

    results.style.display = 'flex'; 
}

function restartGame() {
    timeLeft = 30;
    isPlaying = false;
    currentCharIndex = 0;
    correctChars = 0;
    totalChars = 0;
    userInput = '';

    chrono.textContent = '30s';
    wpm.textContent = '0';
    accuracy.textContent = '0%';
    results.style.display = 'none';
    textInput.disabled = false;
    textInput.value = '';
    textInput.placeholder = "Tapez ici pour commencer...";

    currentText = texts[Math.floor(Math.random() * texts.length)];
    displayText(); 

    textInput.addEventListener('keydown', beginOnFirstInput); 
}

init();