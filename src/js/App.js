import Goal from "./Goal";
import LocalStorage from "./LocalStorage";

class App {
    // constructor to initialize all global vars and methods
    constructor() {
        this.$submitBtn = document.getElementById("submitButton");
        this.$goalList = document.getElementById("goalList");
        this.$goalDelete = document.getElementsByName("deleteGoal");
        this.$addGoalBtn = document.getElementById("addGoal");
        this.$goalForm = document.getElementById("goalForm");

        this.$onCarots = document.getElementsByName("onCarot");
        this.$offCarots = document.getElementsByName("offCarot");
        this.$goalDetails = document.getElementsByName("goalDetails");
        
        this.localStorage = new LocalStorage();
        this.form = this.$goalForm;
        this.addGoalBtn = this.$addGoalBtn;

        this.savedGoals = this.localStorage.fillGoalList([]);
        
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
            let formData = new FormData(this.form);
            let newGoal = Goal.newFromForm(formData);
            LocalStorage.storeGoal(newGoal);
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