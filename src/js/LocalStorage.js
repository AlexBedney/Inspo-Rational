import Goal from "./Goal";

class LocalStorage {
    constructor() {

    }

    fillGoalList() {
        let list;
        if(!localStorage["goalsList"]) {
            list = [
                Goal.newDefaultGoal()
            ];
            list[0].index = 0;
            this.setLocalStorage(list);
            return list;
        }
        list = this.getParsedLocalStorage();

        return list;
    }

    // Setting localStorage array to contain toJson goals from passed in list
    setLocalStorage(goalList) {
        localStorage["goalsList"] = this.toJson(goalList);
    }
    
    // returns the parsing command for ease of changing it and allowing universal use
    getParsedLocalStorage() {
        return JSON.parse(localStorage["goalsList"]);
    }

    addGoal(goal) { 

    }

    toJson(goals) {
        return JSON.stringify(goals);
    }


    deleteGoal(goal) {

    }

    // Takes in a goal, gives it an index, and stores it into locaStorage
    storeGoal(goal) {
        let goals = this.getParsedLocalStorage();
        goal.index = (goals[goals.length - 1].index) + 1;
        goals.push(goal);

        this.setLocalStorage(goals);
    }
}

export default LocalStorage;