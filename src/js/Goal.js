// Has attributes for initializing the tools and validation of new goals
const regTitle = /[a-zA-Z0-9_/.!?',"$#&() ]{1,50}/;
const regBody = /[a-zA-Z0-9_/.!?',"$#&() ]{1,250}/;

class Goal {
    // Instance variables
    title;
    startFrom;
    endAt;
    body;

    constructor(obj) {
        this.title = obj.title;
        this.startFrom = obj.startFrom;
        this.endAt = obj.endAt;
        this.body = obj.body;
        
        // Form fields
        this.$submitBtn = document.getElementById("submitButton");
    }

    static newFromForm(formData) {
        let newGoalObj = {
            title: formData.get("title"),
            start: formData.get("start"),
            end: formData.get("end"),
            body: formData.get("body"),
        }

        let newGoal = new Goal(newGoalObj);

        return newGoal;
    }

    static validateForm(form) {
        if (!regTitle.test(form.title.value)) {
            form.title.classList.add("is-invalid");
            return false;
        }

        if (form.start.value == null || form.end.value == null){
            form.start.classList.add("is-invalid");
            form.end.classList.add("is-invalid");
            return false;   
        }

        if (form.start.value > form.end.value) {
            form.start.classList.add("is-invalid");
            form.end.classList.add("is-invalid");
            return false;   
        }

        if (!regBody.test(form.body.value)) {
            form.body.classList.add("is-invalid");
            return false;
        }

        return true;
    }
    
    delete(goal) {
        var goalIndex
        for (var i = 0; i < goals.length; i++) {
            if (goals[i] === goal) {
                goalIndex = i;
            }
        }
        goals.splice(goalIndex, 1);
    }
    render(index) {
        return `<div class="goal-form">
                <div class="row m-2">
                    <h5 class="col-5">Goal: ${this.title}</h5>
                    <h5 class="col-5">Starting from: ${this.startFrom} to ${this.endAt}</h5>
                    <button class="btn btn-info col-1" name="onCarot" data-action="show" data-index="${index}"><i class="bi bi-caret-left-fill"></i></button>
                    <button class="btn btn-secondary col-1 visually-hidden" name="offCarot" data-action="hide" data-index="${index}"><i class="bi bi-caret-down"></i></button>
                    <button class="btn btn-danger col-1" name="deleteGoal data-action="delete" data-index="${index}""><i class="bi bi-trash3-fill"></i></button>
                </div>
                <div class="row m-1 p-1 pe-3 visually-hidden" style="background-color: #636363;" name="goalDetails">
                    <div id="goalProgress">
                        <div id="currentProgress"></div>
                    </div>
                    <div class="rounded-3 p-1 m-1" style="background-color: #dddddd;">${this.body}</div>
                </div>
            </div>`;
    }

    static newDefaultGoal() {
        const today = new Date();
        const yyyy = today.getFullYear();
        // Months start at 0
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        let nextDd = today.getDate() + 1;

        if (dd < 10) dd = '0' + dd;
        if (nextDd < 10) nextDd = '0' + nextDd;
        if (mm < 10) mm = '0' + mm;

        let goal = {
            title: "Create A New Goal",
            startFrom: yyyy + "-" + mm + "-" + dd,
            endAt: yyyy + "-" + mm + "-" + nextDd,
            body: "Create a new goal for myself to eventually reach, that would be really cool."
        }

        let defaultGoal = new Goal(goal);

        return defaultGoal;
    }
}

export default Goal;