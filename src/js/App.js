import Goal from "./Goal";

class App {
    // constructor to initialize all global vars and methods
    constructor() {
        this.$goalList = document.getElementById("goalList");
        this.$onCarots = document.getElementsByName("onCarot");
        this.$offCarots = document.getElementsByName("offCarot");
        this.$goalDetails = document.getElementsByName("goalDetails");
        this.$goalDelete = document.getElementsByName("deleteGoal");
        this.$addGoalBtn = document.getElementById("addGoal");
        this.$goalForm = document.getElementById("goalForm");

        // Method bindings

        // RE-HIDE FORM WHEN CODE IS WORKING - visually-hidden

        let savedGoals = this.loadGoals();
        if (!savedGoals || savedGoals.length == 0) {
            savedGoals = [
                Goal.newDefaultGoal()
            ];
        }
        this.renderGoals(savedGoals);
        this.addListeners();
    }

    addListeners() {
        //this.hideForm = this.hideForm.bind(this);
        //this.initForm = this.initForm.bind(this);
        //this.newFromForm = this.newFromForm.bind(this);
        //this.$addGoalBtn.onclick = Goal.initForm;
        this.$submitBtn.onclick = Goal.newFromForm;

        for (var index = 0; index < goals.length; index++) {
            this.$onCarots[index].onclick = this.showDetails.bind(this, index);
            this.$offCarots[index].onclick = this.hideDetails.bind(this, index);
        }
    }

    loadGoals() {
        //localStorage["goalsList"] = JSON.stringify(goals);
        if(!localStorage["goalsList"]) {
            return [];
        }
        let goals = JSON.parse(localStorage["goalsList"]);

        let savedGoals = [];
        for (var index = 0; index < goals.length; index++) {
            let goal = new Goal(goals[index]);
            savedGoals.push(goal);
        }

        return savedGoals;
    }

    renderGoals(goals) {
        var goalHtml = "";

        for (var index = 0; index < goals.length; index++) {
            goalHtml += goals[index].render();
            console.log(goals[index]);
        }

        this.$goalList.innerHTML = goalHtml;
    }

    showDetails(index) {
        this.$goalDetails[index].classList.remove("visually-hidden");
        this.$onCarots[index].classList.add("visually-hidden");
        this.$offCarots[index].classList.remove("visually-hidden");
    }

    hideDetails(index) {
        this.$goalDetails[index].classList.add("visually-hidden");
        this.$onCarots[index].classList.remove("visually-hidden");
        this.$offCarots[index].classList.add("visually-hidden");
    }

    initForm() {
        this.$goalForm.classList.remove("visually-hidden");
        this.$addGoalBtn.onclick = this.hideForm;
    }

    hideForm() {
        this.$goalForm.classList.add("visually-hidden");
        this.$addGoalBtn.onclick = this.initForm;
    }
}

export default App;