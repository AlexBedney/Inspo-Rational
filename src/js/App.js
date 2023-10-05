import Goal from "./Goal";
import Quote from "./Quote";
import LocalStorage from "./LocalStorage";
const QUOTE_LIST_NAME = "quotesList";
const GOAL_LIST_NAME = "goalsList";
const QUOTE_COUNT = 10;

class App {
    // constructor to initialize all global vars and methods
    constructor() {
        this.$submitBtn = document.getElementById("submitButton");
        this.$goalList = document.getElementById("goalList");
        this.$goalDelete = document.getElementsByName("deleteGoal");
        this.$addGoalBtn = document.getElementById("addGoal");
        this.$goalForm = document.getElementById("goalForm");
        this.$clearGoalsBtn = document.getElementById("clearGoals");
        this.$clearConfirmBtn = document.getElementById("clearConfirm");

        this.$onCarots = document.getElementsByName("onCarot");
        this.$offCarots = document.getElementsByName("offCarot");
        this.$goalDetails = document.getElementsByName("goalDetails");
        
        this.form = this.$goalForm;
        this.addGoalBtn = this.$addGoalBtn;

        // if LcoalStorage has nothing, make a default array to set it to
        if (LocalStorage.getArray(GOAL_LIST_NAME).length == 0) {
            LocalStorage.setLocalStorage(GOAL_LIST_NAME, [Goal.newDefaultGoal()]);
        }

        this.savedGoals = LocalStorage.getArray(GOAL_LIST_NAME);
        
        this.renderGoals(this.savedGoals);
    }

    handleEvent(e) {
        // Careful, any this. will be ignored and alienate any functions to it inside, hence why creating a goal isn't here
        // let isClick = e.type == "click";
        let target = e.target;
    
        // HTML5 data attributes;
        let data = target.dataset;
    
        // No action to take if data is null.
        if (!data) return; 
        
        let action = data.action; // What action to take?
        let index = data.index;
    
        if ("delete" == action) {
            LocalStorage.delete(GOAL_LIST_NAME, this.savedGoals, this.savedGoals[index]);
            alert("Deleted one of your goals.");
            return new App();
        }

        if("create" == action) {
            let isValid = Goal.validateForm(this.form);
            if(!isValid) {
                return;
            }
            let formData = new FormData(this.form);
            let newGoal = Goal.newFromForm(formData);
            LocalStorage.store(GOAL_LIST_NAME, newGoal);

            // Run this by team to see if good idea, works well for testing so might do over console logs.
            alert("Goal successfully added to local storage.");
            return new App();
        }

        if ("clearGoals" == action) {
            this.$clearConfirmBtn.classList.toggle("visually-hidden");
        }

        if ("clearConfirm" == action) {
            this.$clearConfirmBtn.classList.toggle("visually-hidden");
            LocalStorage.clear(GOAL_LIST_NAME);
            return new App();
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
            let indexInt = parseInt(index);
            if (indexInt == QUOTE_COUNT - 2) {
                Quote.loadStorageWithQuotes(QUOTE_COUNT);
                data.index = 0;
                let newQuote = LocalStorage.getSingleObject(QUOTE_LIST_NAME, 0);
                Quote.render(newQuote);
                return;
            }
            data.index = "" + (indexInt + 1);
            let newQuote = LocalStorage.getSingleObject(QUOTE_LIST_NAME, indexInt + 1);
            Quote.render(newQuote);
            return;
        }
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
        var tempGoalObj;

        for (var index = 0; index < goals.length; index++) {
            tempGoalObj = new Goal(goals[index]);
            goalHtml += tempGoalObj.render(index);
        }

        this.$goalList.innerHTML = goalHtml;
    }
}

export default App;