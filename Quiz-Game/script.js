//DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");


const quizQuestions = [
    {
      question: "Which element has the chemical symbol 'Au'?",
      answers: [
        { text: "Silver", correct: false },
        { text: "Gold", correct: true },
        { text: "Oxygen", correct: false },
        { text: "Copper", correct: false },
      ],
    },
    {
      question: "Who painted the ceiling of the Sistine Chapel?",
      answers: [
        { text: "Leonardo da Vinci", correct: false },
        { text: "Raphael", correct: false },
        { text: "Michelangelo", correct: true },
        { text: "Donatello", correct: false },
      ],
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Jupiter", correct: true },
        { text: "Saturn", correct: false },
        { text: "Mars", correct: false },
      ],
    },
    {
      question: "In which year did the Titanic sink?",
      answers: [
        { text: "1912", correct: true },
        { text: "1905", correct: false },
        { text: "1918", correct: false },
        { text: "1925", correct: false },
      ],
    },
    {
      question: "Which language has the most native speakers worldwide?",
      answers: [
        { text: "English", correct: false },
        { text: "Mandarin Chinese", correct: true },
        { text: "Spanish", correct: false },
        { text: "Hindi", correct: false },
      ],
    },
    {
      question: "What is the smallest prime number?",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false },
        { text: "5", correct: false },
      ],
    },
    {
      question: "Which country was the first to land a man on the moon?",
      answers: [
        { text: "Russia", correct: false },
        { text: "China", correct: false },
        { text: "United States", correct: true },
        { text: "Germany", correct: false },
      ],
    },
    {
      question: "Which animal is known as the 'Ship of the Desert'?",
      answers: [
        { text: "Horse", correct: false },
        { text: "Camel", correct: true },
        { text: "Donkey", correct: false },
        { text: "Elephant", correct: false },
      ],
    },
    {
      question: "What is the name of the longest river in the world?",
      answers: [
        { text: "Amazon", correct: true },
        { text: "Nile", correct: false },
        { text: "Yangtze", correct: false },
        { text: "Mississippi", correct: false },
      ],
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      answers: [
        { text: "Oscar Wilde", correct: false },
        { text: "William Shakespeare", correct: true },
        { text: "George Bernard Shaw", correct: false },
        { text: "Charles Dickens", correct: false },
      ],
    }
  ];
  


let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);


function startQuiz() {

    currentQuestionSpan.textContent = 0;
    score = 0;
    currentQuestionIndex = 0
    scoreSpan.text = score;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}


function showQuestion(){
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';
    
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");

        button.textContent = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswer);

        answersContainer.appendChild(button);
    })
}

function selectAnswer(event){
    if(answerDisabled) return;

    answerDisabled = true;

    const selectedButton = event.target;

    const isCorrect = selectedButton.dataset.correct === 'true';

    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
          } else if (button === selectedButton) {
            button.classList.add("incorrect");
          }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}


function showResults() {

    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {

    resultScreen.classList.remove('active');

    startQuiz();
}
