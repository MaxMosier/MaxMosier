const button = document.querySelector("#js-new-quote");
button.addEventListener('click', fetchQuestion);

const apiEndpoint= "https://trivia.cyberwisp.com/getrandomchristmasquestion";

function fetchQuestion(){
    console.log("The button and event call are working as intended so far!");
}

