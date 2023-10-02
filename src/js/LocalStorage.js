import Goal from "./Goal";

class LocalStorage {
    constructor() {

    }

    fillGoalList() {
        if(!localStorage["goalsList"]) {
            return [
                Goal.newDefaultGoal()
            ];
        }
        let list = JSON.parse(localStorage["goalsList"]);

        return list;
    }


    addGoal(goal) { 

    }


    deleteGoal(goal) {

    }

    // Takes in a goal, gives it an index, and stores it into locaStorage
    static storeGoal(goal) {
        let goals = JSON.parse(localStorage["goalsList"]);
        goal.index = goals.length;
        goals.push(goal);
    }
}

export default LocalStorage;