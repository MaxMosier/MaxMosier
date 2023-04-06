const qButton = document.querySelector("#js-new-quote");
qButton.addEventListener("click", () => fetchContent(1));
const aButton = document.querySelector("#js-tweet"); //I'll change the name later if I've the time to.
aButton.addEventListener("click", () => fetchContent(0));

const apiEndpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let json = "";

async function fetchContent(questionOrAnswer) {
  try {
    if (questionOrAnswer > 0) {
      //If input is greater than 0, gives question
      const obtainedQuestion = await fetch(apiEndpoint);
      if (!obtainedQuestion.ok) {
        throw Error(obtainedQuestion.statusText);
      }
      json = await obtainedQuestion.json();

      displayQuestion(json.question);
      displayAnswer("");
      console.log("New question given");
    } else {
      //If equal to or less than 0, gives answer
      displayAnswer(json.answer);
      console.log("New answer given");
    }
  } catch (err) {
    console.log(err);
    alert("Failed to fetch the new question!");
  }
}

function displayQuestion(inQuestion) {
  const questionText = document.querySelector("#js-quote-text");
  questionText.textContent = inQuestion;
}

function displayAnswer(inAnswer) {
  let questionText = document.querySelector("#js-answer-text");
  questionText.textContent = inAnswer;
}
fetchContent(1);
