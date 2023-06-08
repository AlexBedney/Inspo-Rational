import "./general";

class Index {
    // constructor to initialize all global vars and methods
    constructor() {
        this.regTitle = /[a-zA-Z0-9_/.!?',"$#&() ]{1,50}/;
        this.regBody = /[a-zA-Z0-9_/.!?',"$#&() ]{1,250}/;

        try {
            this.goals = JSON.parse(localStorage["goalsList"]);
        }
        catch {
            const today = new Date();
            const yyyy = today.getFullYear();
            // Months start at 0
            let mm = today.getMonth() + 1;
            let dd = today.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            this.goals = [
                {
                    title: "Create A New Goal",
                    startFrom: dd + "/" + mm + "/" + yyyy,
                    endAt: (dd + 1) + "/" + mm + "/" + yyyy,
                    body: "Create a new goal for myself to eventually reach, that would be really cool."
                },
            ]
        }

        this.$qteCntr = document.getElementById("quoteContainer");
        this.$qteBody = document.getElementById("quoteBody");
        this.$qteRfrsh = document.getElementById("quoteRefresh");
        this.$addGoalBtn = document.getElementById("addGoal");
        this.$goalForm = document.getElementById("goalForm");
        this.$goalList = document.getElementById("goalList");

        // Form fields
        this.$formTitle = document.getElementById("title");
        this.$formStart = document.getElementById("start");
        this.$formEnd = document.getElementById("end");
        this.$formBody = document.getElementById("body");
        this.$submitBtn = document.getElementById("submitButton");

        // Method bindings
        this.hideForm = this.hideForm.bind(this);
        this.getStoicQuote = this.getStoicQuote.bind(this);
        this.initForm = this.initForm.bind(this);
        this.creatGoal = this.creatGoal.bind(this);

        this.loadGoals();
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
        this.$submitBtn.onclick = this.creatGoal;
    }

    initForm() {
        this.$goalForm.classList.remove("visually-hidden");
        this.$addGoalBtn.onclick = this.hideForm;
    }

    hideForm() {
        this.$goalForm.classList.add("visually-hidden");
        this.$addGoalBtn.onclick = this.initForm;
    }

    loadGoals() {
        localStorage["goalsList"] = JSON.stringify(this.goals);
        var goalHtml = "";

        for (var index = 0; index < this.goals.length; index++) {
            goalHtml += this.generateGoalHtml(this.goals[index]);
        }

        this.$goalList.innerHTML = goalHtml;
    }

    generateGoalHtml(goal) {
        console.log("running generategoalHtml");
        return `<div class="goal-form">
                <div class="row m-2">
                    <h5 class="col-6">Goal: ${goal.title}</h5>
                    <h5 class="col-4">Starting from: ${goal.startFrom} to ${goal.endAt}</h5>
                    <i class="bi bi-caret-left-fill col-1" id="onCarot"></i>
                    <i class="bi bi-caret-down col-1 visually-hidden" id="offCarot"></i>
                    <i class="bi bi-three-dots-vertical col-1" id="goalOptions"></i>
                </div>
                <div class="row m-1 p-1 pe-3" style="background-color: #636363;" id="goalDetails">
                    <div id="goalProgress">
                        <div id="currentProgress"></div>
                    </div>
                    <div class="rounded-3 p-1 m-1" style="background-color: #dddddd;">${goal.body}</div>
                </div>
            </div>`;
    }

    creatGoal() {
        if(this.validateForm()) {
            const newGoal = {
                title: this.$formTitle.value,
                startFrom: this.$formStart.value,
                endAt: this.$formEnd.value,
                body: this.$formBody.value
            };
            this.goals.push(newGoal);
            
            this.$formTitle.value = "";
            this.$formStart.value = "";
            this.$formEnd.value = "";
            this.$formBody.value = "";
            this.loadGoals();
        }
        else {
            alert("invalid fields found and marked");
        }
    }

    validateForm() {
        if (this.regTitle.test(this.$formTitle.value)) {
            if (this.regBody.test(this.$formBody.value)) {
                if (this.$formStart.value != null && this.$formEnd.value != null){
                    if (this.$formStart.value < this.$formEnd.value) {
                        

                        return true;
                    }
                }
                this.$formStart.classList.add("is-invalid");
                this.$formEnd.classList.add("is-invalid");
            }
            else {
                this.$formBody.classList.add("is-invalid");
            }
        }
        else {
            this.$formTitle.classList.add("is-invalid");
        }

        return false;
    }
}

let indexInit;
window.onload = () => { indexInit = new Index(); }