// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

//Bootstrap JS File
import 'bootstrap';

// Import Application
import App from './App';
import Quote from './Quote';
import LocalStorage from './LocalStorage';

const QUOTE_LIST_NAME = "quotesList";
const QUOTE_COUNT = 10;

window.addEventListener("load", async ()=>{
    if (LocalStorage.isEmpty(QUOTE_LIST_NAME)) {
        let quotes = await Quote.fetchQuotes(QUOTE_COUNT);
        LocalStorage.add(QUOTE_LIST_NAME, quotes);
    }
    
    let nextQuote = LocalStorage.getFirst(QUOTE_LIST_NAME);
    Quote.render(nextQuote);
    var indexInit = new App();
    document.addEventListener("click", indexInit);
}
);