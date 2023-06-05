import "./general";

class Index {
    // constructor to initialize all global vars and methods
    constructor() {

        this.$qteCntr = document.getElementById("quoteContainer");
        this.$qteBody = document.getElementById("quoteBody");
        this.$qteRfrsh = document.getElementById("quoteRefresh");
        this.$addGoalBtn = document.getElementById("addGoal");
        this.$goalForm = document.getElementById("goalForm");

        // Form fields
        this.$formTitle = document.getElementById("title");
        this.$formStart = document.getElementById("start");
        this.$formEnd = document.getElementById("end");
        this.$formBody = document.getElementById("body");

        // Method bindings
        this.hideForm = this.hideForm.bind(this);
        this.getStoicQuote = this.getStoicQuote.bind(this);
        this.initForm = this.initForm.bind(this);
        this.creatGoal = this.creatGoal.bind(this);

        this.getStoicQuote();
        this.addListeners();
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

    addListeners() {
        this.$qteRfrsh.style.cursor = 'pointer';
        this.$qteRfrsh.onclick = this.getStoicQuote;
        this.$addGoalBtn.onclick = this.initForm;
    }

    initForm() {
        this.$goalForm.classList.remove("visually-hidden");
        this.$addGoalBtn.onclick = this.hideForm;
    }

    hideForm() {
        this.$goalForm.classList.add("visually-hidden");
        this.$addGoalBtn.onclick = this.initForm;
    }

    creatGoal() {

    }
}

let indexInit;
window.onload = () => { indexInit = new Index(); }