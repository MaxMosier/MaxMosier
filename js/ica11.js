const button = document.querySelector("#js-new-quote");

button.addEventListener('click', fetchQuestion);

function fetchQuestion(){
    console.log("The button and event call are working as intended so far!");
}

