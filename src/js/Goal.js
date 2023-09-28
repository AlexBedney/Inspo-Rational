// Has attributes for initializing the tools and validation of new goals
class Goal {
    // Instance variables
    title;
    startFrom;
    endAt;
    body;

    constructor(obj) {
        this.regTitle = /[a-zA-Z0-9_/.!?',"$#&() ]{1,50}/;
        this.regBody = /[a-zA-Z0-9_/.!?',"$#&() ]{1,250}/;

        this.title = obj.title;
        this.startFrom = obj.startFrom;
        this.endAt = obj.endAt;
        this.body = obj.body;
        
        // Form fields
        this.$submitBtn = document.getElementById("submitButton");
        
    }

    static newFromForm() {
        if(this.validateForm()) {
            let $formEl = document.getElementById("goalForm");
            const newGoal = {
                title: this.$formTitle.value,
                startFrom: this.$formStart.value,
                endAt: this.$formEnd.value,
                body: this.$formBody.value
            };
            
            this.$formTitle.value = "";
            this.$formStart.value = "";
            this.$formEnd.value = "";
            this.$formBody.value = "";

            return newGoal;
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
        if (mm < 10) mm = '0' + mm;

        let goal = {
            title: "Create A New Goal",
            startFrom: dd + "/" + mm + "/" + yyyy,
            endAt: nextDd + "/" + mm + "/" + yyyy,
            body: "Create a new goal for myself to eventually reach, that would be really cool."
        }

        let defaultGoal = new Goal(goal);

        return defaultGoal;
    }
}

export default Goal;