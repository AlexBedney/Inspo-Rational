// Generates a quote each time it's called.
class QuoteGen {
    // Default constructor with global vars
    constructor() {
        // grabbing quote components
        this.$qteCntr = document.getElementById("quoteContainer");
        this.$qteBody = document.getElementById("quoteBody");
        this.$qteRfrsh = document.getElementById("quoteRefresh");

        // binding methods
        this.getStoicQuote = this.getStoicQuote.bind(this);

        this.getStoicQuote();
        this.addQuoteListeners();
    }

    addQuoteListeners() {
        this.$qteRfrsh.style.cursor = 'pointer';
        this.$qteRfrsh.onclick = this.getStoicQuote;
    }

    getStoicQuote() {
        const requestOptions = {
            method: 'GET',
            mode: 'cors'
        };
        
        // CHANGE URL TO BE QUOTE_URL FROM .ENV WHEN IT'S WORKING
        fetch(QUOTE_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            this.$qteBody.innerHTML = "\"" + data.quote + "\" - " + data.author;
            this.$qteCntr.classList.remove("visually-hidden");
        }).catch(error => {
            this.$qteCntr.classList.add("visually-hidden");
            this.$qteBody.innerHTML = "Error in fetching quote :(";
        });
    }
}

export default QuoteGen;