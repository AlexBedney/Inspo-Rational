import Goal from "./Goal";
import Quote from "./Quote";
// Class allowing access methods to alter localStorage arrays by name
class LocalStorage {
    // Default constructor that doesn't do anything
    constructor() {}

    // Grabs one object from the passed in list and index of localStorage and returns it
    static getItemAt(name, index) {
        let objs = this.getItems(name);
        return objs[index];
    }

    static getFirst(name) {
        return LocalStorage.getItems(name).shift();
    }

    static getLast(name) {
        return LocalStorage.getItems(name).pop();
    }

    // returns a array with the name passed in, will return empty array if null
    static getItems(name) {
        let items = !localStorage[name] ? [] : JSON.parse(localStorage[name]);
        return items.map((o)=>{
            // return o.type != null ? new o.type(o) : o;
            return o;
        });
    }

    // Setting localStorage array to contain JSON object(s) from passed in array
    static add(name, objs) {
        let existing = LocalStorage.has(name) ? LocalStorage.getItems(name) : [];
        objs = Array.isArray(objs) ? objs : [objs];
        let newArray = existing.concat(objs);
        localStorage[name] = LocalStorage.toJson(newArray);
    }

    static isEmpty(name) {
        let items = LocalStorage.getItems(name);
        return items.length == 0;
    }

    static has(name) {
        return localStorage[name];
    }

    // Turns passed object array to JSON stringified array, if object doesn't have toJson() method, it doesn't alter it
    static toJson(objs) {
        let willBeSerialized = objs.map(function(o) {
            let obj = o.toJson ? o.toJson() : o;
            obj.type = o.constructor.name;
            return obj;
        });
        return JSON.stringify(willBeSerialized);
    }

    // Deletes an object from a locally stored array
    static delete(name, objs, obj) {
        let objIndex = objs.indexOf(obj);
        objs.splice(objIndex, 1);
        LocalStorage.add(name, objs);
    }

    // Clears a passed in last name from localStorage
    static clear(name) {
        localStorage.removeItem(name);
    }
}

export default LocalStorage;