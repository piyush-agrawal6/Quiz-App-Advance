const startBtn = document.querySelector(".start button");
const infoBox = document.querySelector(".info_box");
const quitBtn = document.querySelector(".quit");
const restartBtn = document.querySelector(".restart");
const quizBox = document.querySelector(".quiz_box");
const nextBtn = document.querySelector(".next_btn");
const optionsList = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer_sec");
const resultBox = document.querySelector(".result_box");
const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

startBtn.addEventListener("click", () => {
  infoBox.classList.add("activeOnClick");
});

quitBtn.addEventListener("click", () => {
  infoBox.classList.remove("activeOnClick");
});

restartBtn.addEventListener("click", () => {
  quizBox.classList.add("activeOnClick");
  infoBox.classList.remove("activeOnClick");
  showQuestion(0);
  quesCounter(1);
  startTimer(15);
});
let quesCount = 0;
let quesNum = 1;
let counter;
let timeValue = 15;
let userScore = 0;

nextBtn.addEventListener("click", () => {
  if (quesCount < questions.length - 1) {
    quesCount++;
    quesNum++;
    showQuestion(quesCount);
    quesCounter(quesNum);
    clearInterval(counter);
    startTimer(timeValue);
  } else {
    console.log("Quiz Over");
    showResultBox();
  }
});
restartQuiz.addEventListener("click", () => {
       window.location.reload();
});
quitQuiz.addEventListener("click", () => {
  window.location.reload();
});

// getting questions from Array
function showQuestion(index) {
  const questionsText = document.querySelector(".questions");
  let quesTag =
    "<span>" +
    questions[index].numb +
    "." +
    questions[index].question +
    "</span>";
  let optionTag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "<span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "<span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "<span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "<span></div>";

  questionsText.innerHTML = quesTag;
  optionsList.innerHTML = optionTag;

  const option = optionsList.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionselected(this)");
  }
}

function optionselected(answer) {
  clearInterval(counter);
  let userAns = answer.textContent;
  let correctAns = questions[quesCount].answer;
  let allOptions = optionsList.children.length;

  if (userAns === correctAns) {
    answer.classList.add("correct");
    console.log("correct Ans");
    userScore += 1;
    console.log(userScore);
  } else {
    answer.classList.add("notcorrect");
    console.log("wrong Ans");
  }

  for (let i = 0; i < allOptions; i++) {
    optionsList.children[i].classList.add("disabled");
  }
}

function showResultBox() {
  quizBox.classList.remove("activeOnClick");
  infoBox.classList.remove("activeOnClick");
  resultBox.classList.add("activeOnClick");
  const scoreText = resultBox.querySelector(".score_text");
  let scoreTag =
    "<span>And you scored<p>" + userScore + "</p>out of<p>5</p></span>";
  scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      quesCount++;
      quesNum++;
      showQuestion(quesCount);
      quesCounter(quesNum);
      startTimer(timeValue);
    }
  }
}

function quesCounter(quesNum) {
  let totalQuesCounter = document.querySelector(".footer");
  let quesCounterTag =
    "<span><p>" +
    quesNum +
    "</p> of <p>" +
    questions.length +
    "</p>Questions</span>";
  totalQuesCounter.innerHTML = quesCounterTag;
}
