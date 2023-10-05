// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

//Bootstrap JS File
import 'bootstrap';

// Import Application
import App from './App';
import Quote from './Quote';

const QUOTE_COUNT = 10;

window.addEventListener("load", ()=>{
    Quote.loadStorageWithQuotes(QUOTE_COUNT);
    var indexInit = new App();
    document.addEventListener("click", indexInit);
}
);