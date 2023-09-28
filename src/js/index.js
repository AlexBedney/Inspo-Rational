// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

//Bootstrap JS File
import 'bootstrap';

// Import Application
import App from './App';
import QuoteGen from './QuoteGen';

window.addEventListener("load", ()=>{
    var quoteInit = new QuoteGen();
    var indexInit = new App();
}
);