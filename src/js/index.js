// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/main.css';

//Bootstrap JS File
import 'bootstrap';

// Import Application
import App from './App';
import Quote from './Quote';

window.addEventListener("load", ()=>{
    Quote.loadStorageWithQuotes(10);
    var indexInit = new App();
    document.addEventListener("click", indexInit);
}
);