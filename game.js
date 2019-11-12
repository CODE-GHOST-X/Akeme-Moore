const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

    {

        question: "(CONSIDERED): At the moment, zessing is CONSIDERED the best treatment, for stressing.",
        choice1: "Deemed to be",
        choice2: "Considered",
        choice3: "Found to be",
        choice4: "None above",
        answer: 1
            },

    {
        question: "(GRANT): He had been GRANTed entry into the White House only for the daily briefing, later that afternoon.",
        choice1: "Wanting",
        choice2: "Accept",
        choice3: "Allow to have",
        choice4: "Confer",
        answer: 3
            },

    {
        question: "(CONSTANT): The behaviour of the past generations has remaind at CONSTANT, no changes has been made.",
        choice1: "Uniform",
        choice2: "Regular",
        choice3: "Unbroken",
        choice4: "Unchanged",
        answer: 4
            },

    {

        question: "(COAST): Martello towers must be built within short distances all round the COAST.",
        choice1: "Curise",
        choice2: "Taxi",
        choice3: "Littoral",
        choice4: "ShoreLine",
        answer: 4
            },

    {
        question: "(AFFECT): The older folks believe that the younger generation has been badly AFFECTed by Dancehall music. ",
        choice1: "Fake",
        choice2: "Infulenced",
        choice3: "Make out",
        choice4: "Modify",
        answer: 2
            },

    {
        question: "(LABOR): Today many persons don't like hard LABOR to get a monthly income ",
        choice1: "Grind",
        choice2: "Work",
        choice3: "Plod",
        choice4: "Slave",
        answer: 2
            },

    {
        question: "(LEVEL): Only last month did the men’s and women’s unemployment rates reach the same LEVEL. ",
        choice1: "Position",
        choice2: "Equalize",
        choice3: "Plane ",
        choice4: "None above",
        answer: 1
            },

    {
        question: "(APPEAL): To get traditional women’s accessories to look APPEALing to men, some designers are giving them mainly names and styles.",
        choice1: "Claim",
        choice2: "Equalize",
        choice3: "Attractive",
        choice4: "Strike",
        answer: 3
            },

    {
        question: "(RANGE): At USC there are a wide RANGE of degrees for a person to choose from.",
        choice1: "Dispose",
        choice2: "Variety",
        choice3: "Run",
        choice4: "Differ",
        answer: 2
            },

    {
        question: "(YIELD): It is a very important honey plant, as it yields an exceptionally pure nectar and",
        choice1: "Admit",
        choice2: "Equalize",
        choice3: "Leave",
        choice4: "Supply",
        answer: 4
            }
        ];

//constants
const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {

    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //going to end page when the max question has been reached.
        return window.location.assign("end.html");
    }

    questionCounter++;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;


    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 3000);


    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();
