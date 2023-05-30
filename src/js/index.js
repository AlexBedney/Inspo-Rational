class Index {
    // constructor to initialize all global vars and methods
    constructor() {

        this.$qteBody = document.getElementById("quoteBody");

        console.log("Running constructor");

        this.GetStoicQuote();
    }

    GetStoicQuote() {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            credentials: "same-origin",
            headers: { 'Content-Type': 'application/json' },
            referrerPolicy: "origin-when-cross-origin"
        };
        
        // CHANGE URL TO BE QUOTE_URL FROM .ENV WHEN IT'S WORKING
        fetch(`https://api.themotivate365.com/stoic-quote`)
        .then(response => {
            this.$qteBody.innerHTML = response.quote + " - " + response.author;
        }).catch(error => {
            this.$qteBody.innerHTML = "Error in fetching quote :(";
        });
    }
}

let indexInit;
window.onload = () => { indexInit = new Index(); }