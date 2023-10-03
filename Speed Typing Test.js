let speedTypingTest = document.getElementById("speedTypingTest");
let timer = document.getElementById("timer");
let quoteDisplay = document.getElementById("quoteDisplay");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let counter = 0;

let intervalId = null;

function clearIntervalEl() {
    clearInterval(intervalId);
}

function startTimer() {
    counter = 0;
    intervalId = setInterval(function() {
        counter = counter + 1;
        timer.textContent = counter;
    }, 1000);
    return intervalId;

}

function randomQuotation() {
    let option = {
        method: "GET"
    };

    fetch("https://apis.ccbp.in/random-quote", option)
        .then(function(event) {
            return event.text();
        })
        .then(function(data) {
            spinner.classList.add("d-none");
            quoteDisplay.textContent = JSON.parse(data).content;
            startTimer();
        });

}
resetBtn.onclick = function() {
    clearInterval(intervalId);
    quoteDisplay.textContent = "";
    spinner.classList.remove("d-none");
    randomQuotation();
    quoteInput.value = "";

};

submitBtn.onclick = function() {
    if (quoteInput.value === quoteDisplay.textContent) {
        result.textContent = "You typed in " + counter + " seconds";
        clearIntervalEl();

    } else {
        result.textContent = "You typed incorrect sentence";
    }
};

randomQuotation();
spinner.classList.remove("d-none");