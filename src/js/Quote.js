import LocalStorage from "./LocalStorage";
const QUOTE_LIST_NAME = "quotesList";
const MILISECOND_WAIT = 2000;
// Generates a quote each time it's called.
class Quote {
    // Instance variables
    author;
    quote;

    // Default constructor with global vars
    constructor(obj) {
        if (!obj || obj == null) {
            return;
        }
        this.author = obj.author;
        this.quote = obj.quote;
    }

    // Gets a number of quotes equal to what is passed in and creates an array of them that uses an await method to delay
    static async loadStorageWithQuotes(quoteNum) {
        let fetchedQuotes = [];
        LocalStorage.setLocalStorage(QUOTE_LIST_NAME, []);
        for(let ind = 0; ind < quoteNum; ind++) {
            Quote.getStoicQuote(fetchedQuotes);
        }
        const results = await Quote.waitForListFill(MILISECOND_WAIT);
        LocalStorage.setLocalStorage(QUOTE_LIST_NAME, fetchedQuotes);

        let renderQuote = LocalStorage.getSingleObject(QUOTE_LIST_NAME, 0);
        Quote.render(renderQuote);
    }

    // Takes in an array of quotes to which it will add upon it a new quote object using data's returned values
    static getStoicQuote(quoteArray) {
        const requestOptions = {
            method: 'GET',
            mode: 'cors'
        };

        let newQuote
        
        fetch(QUOTE_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.author == "" || data.author == null) {
                data.author = "Unknown";
            }
            newQuote = new Quote(data);
            quoteArray.push(newQuote);
            return;
        }).catch(error => {
            return {
                author: "Error",
                quote: "Error"
            };
        });
    }

    toJson() {
        return {
            author: this.author,
            quote: this.quote
        };
    }

    // add render for quote class, takes in quote as param, return html
    static render(q) {
        document.getElementById("quoteBody").innerHTML = "\"" + q.quote + "\" - " + q.author;
        document.getElementById("quoteContainer").classList.remove("visually-hidden");
    }

    static waitForListFill(waitPeriod) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, waitPeriod);
        });
      }
}

export default Quote;