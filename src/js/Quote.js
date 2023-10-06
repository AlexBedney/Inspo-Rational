import LocalStorage from "./LocalStorage";
const QUOTE_LIST_NAME = "quotesList";
const MILISECOND_WAIT = 4000;
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
        LocalStorage.add(QUOTE_LIST_NAME, []);
        for(let ind = 0; ind < quoteNum; ind++) {
            Quote.getStoicQuote(fetchedQuotes);
        }
        const results = await Quote.waitForListFill(MILISECOND_WAIT);
        LocalStorage.add(QUOTE_LIST_NAME, fetchedQuotes);

        let renderQuote = LocalStorage.getItemAt(QUOTE_LIST_NAME, 0);
        Quote.render(renderQuote);
    }

    static async fetchQuotes(quoteNum) {
        const requestOptions = {
            method: 'GET',
            mode: 'cors'
        };

        let quotes = [];

        for(let i = 0; i < quoteNum; i++) {
            let resp = await fetch(QUOTE_URL, requestOptions);
            let data = await resp.json();
            if (data.author == "" || data.author == null) {
                data.author = "Unknown";
            }
            quotes.push(new Quote(data));
        }

        return quotes;
    }

    // Takes in an array of quotes to which it will add upon it a new quote object using data's returned values
    static getStoicQuote(quoteArray) {
        /*
            quoteArray.push(newQuote);
            return;
        }).catch(error => {
            return {
                author: "Error",
                quote: "Error"
            };
        });*/
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