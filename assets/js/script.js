const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text_input');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const resultsElement = document.getElementById('results');
const finalWpmElement = document.getElementById('final-wpm');
const finalAccuracyElement = document.getElementById('final-accuracy');
const totalWordsElement = document.getElementById('total-words');
const totalCharsElement = document.getElementById('total-chars');
const timeSelect = document.getElementById('duration');
const difficultySelect = document.getElementById('difficulty');
const btnToggle = document.querySelector(".btn_toggle")
const icon = btnToggle.querySelector("i")
const Login = document.querySelector('.login_button')
const restartBtn = document.querySelector('.restart_btn');

let timeLeft = 30;
let maxTime = 30;
let timer;
let isPlaying = false;
let startTime;
let correctChars = 0;
let totalChars = 0;
let currentText = '';
let currentCharIndex = 0;
let userInput = '';
let difficulty = 'easy';
let wpmHistory = [];
let chart = null;


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


  const texts = {
    easy: [
      "The cat is sleeping on the warm chair. It wakes up when I walk by and stretches its legs before jumping down. The cat is sleeping on the warm chair. It wakes up when I walk by and stretches its legs before jumping down. The cat is sleeping on the warm chair. It wakes up when I walk by and stretches its legs before jumping down.",
      "I like to eat an apple every morning. The red ones are sweet and juicy, and they give me energy for the day. I like to eat an apple every morning. The red ones are sweet and juicy, and they give me energy for the day. I like to eat an apple every morning. The red ones are sweet and juicy, and they give me energy for the day.",
      "The sun is bright and the sky is blue. Children are playing outside and laughing as they run around the park. The sun is bright and the sky is blue. Children are playing outside and laughing as they run around the park. The sun is bright and the sky is blue. Children are playing outside and laughing as they run around the park.",
      "She walks to school every day. It is a short walk, and she enjoys looking at the flowers on the way. She walks to school every day. It is a short walk, and she enjoys looking at the flowers on the way. She walks to school every day. It is a short walk, and she enjoys looking at the flowers on the way.",
      "Tom has a small dog. The dog likes to play with a ball and run in the garden behind the house. Tom has a small dog. The dog likes to play with a ball and run in the garden behind the house. Tom has a small dog. The dog likes to play with a ball and run in the garden behind the house.",
      "We went to the zoo last week. I saw lions, monkeys, and a giraffe eating leaves from a tall tree. We went to the zoo last week. I saw lions, monkeys, and a giraffe eating leaves from a tall tree. We went to the zoo last week. I saw lions, monkeys, and a giraffe eating leaves from a tall tree.",
      "My favorite color is blue. I have a blue bike, a blue bag, and even a blue notebook for school. My favorite color is blue. I have a blue bike, a blue bag, and even a blue notebook for school. My favorite color is blue. I have a blue bike, a blue bag, and even a blue notebook for school.",
      "Dad made pancakes for breakfast. They were warm and soft, with sweet syrup on top. Dad made pancakes for breakfast. They were warm and soft, with sweet syrup on top. Dad made pancakes for breakfast. They were warm and soft, with sweet syrup on top.",
      "Sarah drew a picture of a tree with birds on the branches and clouds in the sky above. Sarah drew a picture of a tree with birds on the branches and clouds in the sky above. Sarah drew a picture of a tree with birds on the branches and clouds in the sky above."
    ],
    medium: [
      "During the summer, we visited a quiet mountain village. The air was fresh, and the view from the top was breathtaking. During the summer, we visited a quiet mountain village. The air was fresh, and the view from the top was breathtaking. During the summer, we visited a quiet mountain village. The air was fresh, and the view from the top was breathtaking.",
      "Reading books improves our vocabulary and imagination. It lets us explore new ideas and worlds without leaving home. Reading books improves our vocabulary and imagination. It lets us explore new ideas and worlds without leaving home. Reading books improves our vocabulary and imagination. It lets us explore new ideas and worlds without leaving home.",
      "She practiced piano for hours every day. Her fingers moved quickly, and the melody flowed like water in a stream. She practiced piano for hours every day. Her fingers moved quickly, and the melody flowed like water in a stream. She practiced piano for hours every day. Her fingers moved quickly, and the melody flowed like water in a stream.",
      "The city was full of noise, but inside the library it was peaceful. People were reading silently and turning pages. The city was full of noise, but inside the library it was peaceful. People were reading silently and turning pages. The city was full of noise, but inside the library it was peaceful. People were reading silently and turning pages.",
      "On Saturday, we cooked a new recipe. It had several spices and took patience, but the result was delicious. On Saturday, we cooked a new recipe. It had several spices and took patience, but the result was delicious. On Saturday, we cooked a new recipe. It had several spices and took patience, but the result was delicious.",
      "The train passed through forests, rivers, and tunnels. Every moment outside the window was a new discovery. The train passed through forests, rivers, and tunnels. Every moment outside the window was a new discovery. The train passed through forests, rivers, and tunnels. Every moment outside the window was a new discovery.",
      "He learned to swim last year. Now, he dives confidently and helps younger kids feel safe in the water. He learned to swim last year. Now, he dives confidently and helps younger kids feel safe in the water. He learned to swim last year. Now, he dives confidently and helps younger kids feel safe in the water.",
      "In autumn, the trees change color and the wind carries the leaves through the streets like a golden wave. In autumn, the trees change color and the wind carries the leaves through the streets like a golden wave. In autumn, the trees change color and the wind carries the leaves through the streets like a golden wave.",
      "The museum had ancient artifacts, detailed paintings, and even a replica of an old Roman house. The museum had ancient artifacts, detailed paintings, and even a replica of an old Roman house. The museum had ancient artifacts, detailed paintings, and even a replica of an old Roman house."
    ],
    hard: [
      "The scientist explained the process of photosynthesis in great detail, highlighting how plants convert light into energy. The scientist explained the process of photosynthesis in great detail, highlighting how plants convert light into energy. The scientist explained the process of photosynthesis in great detail, highlighting how plants convert light into energy.",
      "Despite facing numerous challenges, the architect designed a revolutionary building that blended technology and nature. Despite facing numerous challenges, the architect designed a revolutionary building that blended technology and nature. Despite facing numerous challenges, the architect designed a revolutionary building that blended technology and nature.",
      "Understanding human psychology requires deep analysis, critical thinking, and a willingness to question common beliefs. Understanding human psychology requires deep analysis, critical thinking, and a willingness to question common beliefs. Understanding human psychology requires deep analysis, critical thinking, and a willingness to question common beliefs.",
      "The professor discussed quantum mechanics using complex equations that describe particle behavior at atomic levels. The professor discussed quantum mechanics using complex equations that describe particle behavior at atomic levels. The professor discussed quantum mechanics using complex equations that describe particle behavior at atomic levels.",
      "To master classical literature, students must interpret metaphorical language and cultural references with precision. To master classical literature, students must interpret metaphorical language and cultural references with precision. To master classical literature, students must interpret metaphorical language and cultural references with precision.",
      "Advancements in artificial intelligence have raised ethical concerns about privacy, autonomy, and decision-making. Advancements in artificial intelligence have raised ethical concerns about privacy, autonomy, and decision-making. Advancements in artificial intelligence have raised ethical concerns about privacy, autonomy, and decision-making.",
      "The symposium gathered experts from various fields to explore interdisciplinary approaches to global challenges. The symposium gathered experts from various fields to explore interdisciplinary approaches to global challenges. The symposium gathered experts from various fields to explore interdisciplinary approaches to global challenges.",
      "Economic fluctuations are influenced by a multitude of factors, including consumer confidence and market speculation. Economic fluctuations are influenced by a multitude of factors, including consumer confidence and market speculation. Economic fluctuations are influenced by a multitude of factors, including consumer confidence and market speculation.",
      "The legal document was filled with intricate clauses, requiring meticulous review to ensure compliance and fairness. The legal document was filled with intricate clauses, requiring meticulous review to ensure compliance and fairness. The legal document was filled with intricate clauses, requiring meticulous review to ensure compliance and fairness."
    ]
  };
  

  function getRandomText() {
    const levelTexts = texts[difficulty];
    return levelTexts[Math.floor(Math.random() * levelTexts.length)];
  }  

function init() {
    currentText = getRandomText();
    
    displayText();
    
    textInput.addEventListener('input', handleInput);
    textInput.addEventListener('keydown', handleFirstKeyPress);
    restartBtn.addEventListener('click', restartGame);
    timeSelect.addEventListener('change', updateTime);
    difficultySelect.addEventListener('change', updateDifficulty);
}

function updateTime() {
    const selectedMode = timeSelect.value;
    if (selectedMode === 'easy') {
        maxTime = 30;
    } else if (selectedMode === 'medium') {
        maxTime = 60;
    } else if (selectedMode === 'hard') {
        maxTime = 120;
    }

    timeLeft = maxTime;
    timerElement.textContent = timeLeft + 's';
}


function updateDifficulty() {
    difficulty = difficultySelect.value;
    if (!isPlaying) {
        currentText = getRandomText();
        displayText();
    }
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
    
function handleFirstKeyPress() {
    if (!isPlaying) {
        startGame();
        textInput.removeEventListener('keydown', handleFirstKeyPress);
    }
}

function startGame() {
    isPlaying = true;
    startTime = new Date().getTime();
    timeLeft = maxTime;
    currentCharIndex = 0;
    correctChars = 0;
    totalChars = 0;
    userInput = '';
    textInput.placeholder = "Tapez le texte ci-dessus...";
    resultsElement.style.display = 'none';
    textInput.value = '';
    timeSelect.disabled = true;
    difficultySelect.disabled = true;
    timer = setInterval(updateTimer, 1000);
    updateStats();
    displayText();
}

function handleInput(e) {
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
        currentText = getRandomText();
        userInput = '';
        textInput.value = '';
        displayText();
    }
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft + 's';
    
    if (timeLeft <= 0) {
        endGame();
    }
}

function updateStats() {
    const currentTime = new Date().getTime();

    const timeElapsed = (currentTime - startTime) / 1000 / 60;

    const words = correctChars / 5;
    let wpm = Math.round(words / timeElapsed);
    if (isNaN(wpm)) {
        wpm = 0;
    }
    let accuracy = 0;
    if (totalChars > 0) {
        accuracy = Math.round((correctChars / totalChars) * 100);
    }

    wpmElement.textContent = wpm;
    wpmHistory.push(wpm);      
    accuracyElement.textContent = accuracy + '%';
}

function endGame() {
    clearInterval(timer);
    isPlaying = false;
    textInput.disabled = true;
    const timeElapsed = maxTime / 60;
    const words = correctChars / 5;
    let wpm = Math.round(words / timeElapsed);

    if (isNaN(wpm)) {
        wpm = 0;
    }

    let accuracy = 0;
    if (totalChars > 0) {
        accuracy = Math.round((correctChars / totalChars) * 100); 
    }
    finalWpmElement.textContent = wpm;
    finalAccuracyElement.textContent = accuracy + '%'
    totalWordsElement.textContent = Math.round(words);
    totalCharsElement.textContent = totalChars;
    resultsElement.style.display = 'block';
    timeSelect.disabled = false;
    difficultySelect.disabled = false;
    renderChart();
}

function restartGame() {
    timeLeft = maxTime;              
    isPlaying = false;             
    currentCharIndex = 0;           
    correctChars = 0;              
    totalChars = 0;                
    userInput = '';                 

    clearInterval(timer);
    timerElement.textContent = timeLeft + 's';        
    wpmElement.textContent = '0';                    
    accuracyElement.textContent = '0%';              
    resultsElement.style.display = 'none';            
    textInput.disabled = false;                       
    textInput.value = '';                             
    textInput.placeholder = "Tapez ici pour commencer...";

    currentText = getRandomText();  
    displayText();                   
    timeSelect.disabled = false;
    difficultySelect.disabled = false;
    textInput.removeEventListener('keydown', handleFirstKeyPress);
    textInput.addEventListener('keydown', handleFirstKeyPress);
    wpmHistory = [];
}

init();

function renderChart() {
    const wpmChart = document.getElementById('wpmChart').getContext('2d');
    if (chart !== null) {
        chart.destroy();
    }

    chart = new Chart(wpmChart, {
        type: 'line',
        data: {
            labels: wpmHistory.map((_, i) => `${i + 1}s`),
            datasets: [{
                label: 'WPM',
                data: wpmHistory,
                borderColor: '#11e4eb',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.2,
                fill: true,
                pointRadius: 3
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Temps (s)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'WPM'
                    }
                }
            }
        }
    });
}
