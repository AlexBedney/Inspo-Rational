// Class allowing access methods to alter localStorage arrays by name
class LocalStorage {
    // Default constructor that doesn't do anything
    constructor() {}

    // returns a array with the name passed in, will return empty array if null
    static getArray(arrayName) {
        return !localStorage[arrayName] ? [] : this.getParsedLocalStorage(arrayName);
    }

    // Setting localStorage array to contain JSON objects from passed in array
    static setLocalStorage(arrayName, objs) {
        localStorage[arrayName] = this.toJson(objs);
    }
    
    // returns the passed array name parsed to JSON
    static getParsedLocalStorage(arrayName) {
        return JSON.parse(localStorage[arrayName]);
    }

    // Turns passed object array to JSON stringified array, if object doesn't have toJson() method, it doesn't alter it
    static toJson(objs) {
        let willBeSerialized = objs.map(function(o) {
            return o.toJson ? o.toJson() : o;
        });
        return JSON.stringify(willBeSerialized);
    }

    // Deletes an object from a locally stored array
    static delete(arrayName, objs, obj) {
        let objIndex = objs.indexOf(obj);
        objs.splice(objIndex, 1);
        this.setLocalStorage(arrayName, objs);
    }

    // Takes in an object, and stores it into localStorage
    static store(arrayName, obj) {
        let objs = this.getParsedLocalStorage(arrayName);
        objs.push(obj);

        this.setLocalStorage(arrayName, objs);
    }
}

export default LocalStorage;