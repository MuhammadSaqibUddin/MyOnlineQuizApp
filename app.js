var questionAns = [{
    question: "Who is the father of Computer science?",
    answers: [
        "Charles Babbage",
        "Edward Robert",
        "Brendan Eich",
        "Allen Turing"
    ],
    correctAnswer: "Allen Turing"
},
{
    question: "The brain of any computer system is?",
    answers: [
        "ALU",
        "Memory",
        "CPU",
        "Control unit"
    ],
    correctAnswer: "CPU"
},
{
    question: "Which programming languages are classified as low level languages?",
    answers: [
        "Assembly Languages",
        "C++",
        "PASCAL",
        "FORTRAN"
    ],
    correctAnswer: "Assembly Languages"
},
{
    question: "Microprocessors as switching devices are for which generation computers?",
    answers: [
        "First Generation",
        "Second Generation",
        "Third Generation",
        "Fourth Generation"
    ],
    correctAnswer: "Fourth Generation"
},
{
    question: "Which of the following computer language is used for artificial intelligence?",
    answers: [
        "FORTRAN",
        "PROLOG",
        "C",
        "COBOL"
    ],
    correctAnswer: "PROLOG"
},
{
    question: "Who invented JavaScript?",
    answers: [
        "Douglas Crockford",
        "Sheryl Sandberg",
        "Brendan Eich",
        "Robert"
    ],
    correctAnswer: "Brendan Eich"
},
{
    question: "Which one of these is a JavaScript package manager?",
    answers: [
        "Node.js",
        "TypeScript",
        "npm",
        "java"
    ],
    correctAnswer: "npm"
},
{
    question: "Which tool can you use to ensure code quality?",
    answers: [
        "ESLint",
        "jQuery",
        "Angular",
        "java"
    ],
    correctAnswer: "ESLint"
},
{
    question: "Which address identifies a process on a host?",
    answers: [
        "Physical Address",
        "Logical Address",
        "Port Address",
        "Specific Address"
    ],
    correctAnswer: "Port Address"
},
{
    question: "Transmission data rate is decided by?",
    answers: [
        "Network Layer",
        "Physical Layer",
        "Data Link Layer",
        "Transport Layer"
    ],
    correctAnswer: "Physical Layer"
},
{
    question: "Bluetooth is an example of?",
    answers: [
        "PAN",
        "LAN",
        "VPN",
        "None of these"
    ],
    correctAnswer: "PAN"
},
{
    question: "To access the services of operating system, the interface is provided by the?",
    answers: [
        "System Calls",
        "API",
        "Library",
        "Assembly Instructions"
    ],
    correctAnswer: "System Calls"
},
{
    question: "If a process fails, most operating system write the error information to a?",
    answers: [
        "Log File",
        "Process",
        "New File",
        "None of these"
    ],
    correctAnswer: "Log File"
},
{
    question: "Which of the following is/are the levels of implementation of data structure?",
    answers: [
        "Abstract level",
        "Application level",
        "Implementation level",
        "All of the these"
    ],
    correctAnswer: "All of the these"
},
{
    question: "Which is not the component of data structure?",
    answers: [
        "Operations",
        "Storage Structures",
        "Algorithms",
        "None of these"
    ],
    correctAnswer: "None of these"
},
{
    question: "Which of the following is non-liner data structure?",
    answers: [
        "Stacks",
        "List",
        "Strings",
        "Trees"
    ],
    correctAnswer: "Trees"
},
{
    question: "Compilers, Editors software come under which type of software?",
    answers: [
        "System software",
        "Application software",
        "Scientific software",
        "DB software"
    ],
    correctAnswer: "System software"
},
{
    question: "Which coding element is generally omitted at the end of line?",
    answers: [
        "Naming conventions",
        "Identifying",
        "Whitespace",
        "Operators"
    ],
    correctAnswer: "Whitespace"
},
{
    question: "The graphics can be?",
    answers: [
        "Drawing",
        "Photograph",
        "Simulation",
        "All of these"
    ],
    correctAnswer: "All of these"
},
{
    question: "Vector graphics is composed of?",
    answers: [
        "Pixels",
        "Paths",
        "Palette",
        "None of these"
    ],
    correctAnswer: "Paths"
}
];

var startTime = 0;
function start() {
    show(0); // display 1st question
    var quizHome = document.getElementById("quiz-home");
    var qzContent = document.getElementById("qz-content");
    quizHome.style.display = "none";
    qzContent.style.display = "block"

    startTime = setInterval(checkTimer, 1000);
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var sec = 0, min = 0;
var timer = document.getElementById('timer');
function checkTimer() {
    sec++;
    if (sec > 59) {
        min++;
        sec = 0;
    }
    timer.innerHTML = addZero(min) + " : " + addZero(sec);
    if (min == 2) {
        clearInterval(startTime);
        alert("Time up");
        showResult();
    }
}

var qCount = 0;
var showQuesCount = document.getElementById("ques-count");

//========= next btn function ================================
function next() {
    var nextBtn = document.getElementById("nextbtn");

    nextBtn.disabled = true; // disabled next btn

    CalculateScore(qCount);
    qCount++;
    showQuesCount.innerHTML = qCount + 1;
    if (qCount < 20) {
        show(qCount);
    }
    else {
        clearInterval(startTime);
        showResult();
    }

    removeOptSelection();

}
//==================================================
function show(n) {
    showQuesCount.innerHTML = qCount + 1; // show the question count 1st time when click start btn
    var question = document.getElementById("question");
    var options = document.getElementsByClassName("opt");
    question.innerHTML = questionAns[n].question;

    // for show options
    for (var a = 0; a < options.length; a++) {
        options[a].children.item(0).innerHTML = questionAns[n].answers[a]; // get the childern(paragraph) of the opt div and set its innerhtml 
    }
}

function AddOptSelection(e) {
    removeOptSelection();
    e.classList.add("opt-select");
    enableNextBtn(); // enabled next btn

}

function removeOptSelection() {
    var options = document.getElementsByClassName("opt");
    //remove selection for avoid double selection
    for (var a = 0; a < options.length; a++) {
        if (options[a].classList.contains("opt-select")) {
            options[a].classList.remove("opt-select");
        }
    }
}

// enabled next btn
function enableNextBtn() {
    var nextBtn = document.getElementById("nextbtn");
    if (nextBtn.disabled) {
        nextBtn.disabled = false;
    }
}
//==============  score calculate and show result functions =================
var score = 0, correctAnsCount = 0;
function CalculateScore(n) {
    var selectedOpt = document.getElementsByClassName("opt-select");
    if (selectedOpt[0].children.item(0).innerHTML == questionAns[n].correctAnswer) {
        correctAnsCount++;
        score = correctAnsCount * 2;
    }
}
function showResult() {
    var result = document.getElementById("result");
    result.style.display = "block"; // show result div

    var qzContent = document.getElementById("qz-content");
    qzContent.style.display = "none"; // hide quiz question div

    var ansCount = document.getElementById("correct-ans");
    ansCount.innerHTML = correctAnsCount;
    var showScore = document.getElementById("show-score");
    showScore.innerHTML = score + " / 40";
    var percentage = document.getElementById("percentage");
    percentage.innerHTML = ((score / 40) * 100).toFixed(2) + "%";
}







