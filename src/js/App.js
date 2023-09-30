import Goal from "./Goal";

class App {
    // constructor to initialize all global vars and methods
    constructor() {
        this.$submitBtn = document.getElementById("submitButton");
        this.$goalList = document.getElementById("goalList");
        this.$goalDelete = document.getElementsByName("deleteGoal");
        this.$addGoalBtn = document.getElementById("addGoal");
        this.$goalForm = document.getElementById("goalForm");

        //this.hideForm = this.hideForm.bind(this);
        //this.initForm = this.initForm.bind(this);
        //this.newFromForm = this.newFromForm.bind(this);
        //this.$addGoalBtn.onclick = Goal.initForm;

        this.$onCarots = document.getElementsByName("onCarot");
        this.$offCarots = document.getElementsByName("offCarot");
        this.$goalDetails = document.getElementsByName("goalDetails");
        this.form = this.$goalForm;
        this.addGoalBtn = this.$addGoalBtn;

        this.savedGoals = this.loadGoals();
        if (!this.savedGoals || this.savedGoals.length == 0) {
            this.savedGoals = [
                Goal.newDefaultGoal()
            ];
        }
        this.renderGoals(this.savedGoals);
    }

    handleEvent(e) {
        // Careful, any this. will be ignored and alienate any functions to it inside, hence why creating a goal isn't here
        // let isClick = e.type == "click";
        let target = event.target;
    
        // HTML5 data attributes;
        let data = target.dataset;
    
        // No action to take if data is null.
        if (!data) return; 
        
        let action = data.action; // What action to take?
        let index = data.index;
    
        if ("delete" == action) {
            // LocalStorage.delete("goalsList", index);
            localStorage.delete("goalsList", index);
            return;
        }

        if("create" == action) {
            let isValid = Goal.validateForm(this.form);
            if(!isValid) {
                return;
            }
            //console.log(formData.values());
            let formData = new FormData(this.form);
            let newGoal = Goal.newFromForm(formData);
            // let goal = LocalStorage.save(newGoal);
            // LocalStorage.save should also append an index variable to access specific goals
            return;
        }

        if ("ux-toggle-goal-form" == action) {
            this.form.classList.toggle("visually-hidden");
        }

        if ("hide" == action) {
            this.$goalDetails[index].classList.add("visually-hidden");
            this.$onCarots[index].classList.remove("visually-hidden");
            this.$offCarots[index].classList.add("visually-hidden");
        }

        if ("show" == action) {
            this.$goalDetails[index].classList.remove("visually-hidden");
            this.$onCarots[index].classList.add("visually-hidden");
            this.$offCarots[index].classList.remove("visually-hidden");
        }
    
        if ("refreshQuote" == action) {
            QuoteGen.refresh();
            return;
        }
        
        //
        // <icon data-action="delete-goal" data-index="1" />
        // One event listener to show previously stored event
        // Another event listener to hide details

        // one event listener to delete events.
        /*
        for (var index = 0; index < this.savedGoals.length; index++) {
            this.$onCarots[index].onclick = this.showDetails.bind(this, index);
            this.$offCarots[index].onclick = this.hideDetails.bind(this, index);
        }/**/
    }

    loadGoals() {
        //localStorage["goalsList"] = JSON.stringify(goals);
        if(!localStorage["goalsList"]) {
            return [];
        }
        let goals = JSON.parse(localStorage["goalsList"]);

        let newSavedGoals = [];
        for (var index = 0; index < goals.length; index++) {
            let goal = new Goal(goals[index]);
            newSavedGoals.push(goal);
        }

        return newSavedGoals;
    }

    renderGoals(goals) {
        var goalHtml = "";

        for (var index = 0; index < goals.length; index++) {
            goalHtml += goals[index].render(index);
        }

        this.$goalList.innerHTML = goalHtml;
    }
}

export default App;