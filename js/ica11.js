const button = document.querySelector("#js-new-quote");
button.addEventListener('click', fetchQuestion);

const apiEndpoint= "https://trivia.cyberwisp.com/getrandomchristmasquestion";

async function fetchQuestion(){
    try {
        const obtainedQuestion = await fetch(endpoint);
        if(!obtainedQuestion.ok){
            throw Error(obtainedQuestion.statusText);
        }
        const json = await obtainedQuestion.json();
        console.log(json);
    } catch(err){
        console.log(err);
        alert("Failed to fetch the new question!");
    }
}

function displayQuestion(inQuestion){
    const questionText = document.querySelector("#js-quote-text");
    questionText.textContent = inQuestion;
}
