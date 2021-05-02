const Datastore = require("nedb");
const userDao = require('../models/userModel.js');

class TrainingPlan {
    constructor(dbFilePath) {
        // creates a database called database.db if it doesnt exist
        // if exists, it sets variable db to that database
        this.db = new Datastore({ filename: "database.db", autoload: true });
    }

    //a function to seed the database initially with 2 sets of prepopulated data
    init() {
        this.db.insert({
            subject: "Run more",
            contents:
                "I want to run more often - at least three times per week.",
            published: "2020-02-16",
            author: "Zuby",
        });
        //debugging - to show it added to database correctly
        console.log("example database entry 1 inserted");

        this.db.insert({
            subject: "More situps",
            contents:
                "I want to do more situps a week - at least 500 in a week.!",
            published: "2020-02-18",
            author: "Zubair",
        });
        //debugging - to show it added to database correctly
        console.log("example database entry 2 inserted");
    }

    //a function to return all entries from the database
    getAllEntries() {
        //return a Promise object, which can be resolved or rejected
        return new Promise((resolve, reject) => {
            //use the find() function of the database to get the data,
            //with error first callback function, err for error, entries for data
            this.db.find({}, function (err, entries) {
                //if error occurs reject Promise
                if (err) {
                    reject(err);
                    //if no error resolve the promise and return the data
                } else {
                    resolve(entries);
                    //returns all entries
                }
            });
        });
    }

    // Function to add an entry to the database
    // author, subject, and contents are passed in from the form
    addEntry(author, subject, contents) {
        var entry = {
            author: author,
            subject: subject,
            contents: contents,
            published: new Date().toISOString().split("T")[0],
        };
        console.log("entry created", entry);

        //adds the entry variable created above from the passed in data
        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document", subject);
            } else {
                console.log("document inserted into the database", doc);
            }
        });
    }

    // Function to remove a specific entry from the database
    // id is passed in from button click
    deleteEntry(id) {
        return new Promise((resolve, reject) => {
            // searches database for matching id
            this.db.remove({ _id: id }, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    console.log(
                        "removed entry with ID of ",id," from database"
                    );
                }
            });
        });
    }

    // Returns entries that match a specific author
    // authorName is passed in from clicking the coloured name in entry
    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            // searches database for matching author name
            this.db.find({ author: authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log(
                        "function getEntriesByUser() returns: ", entries
                    );
                }
            });
        });
    }
}

module.exports = TrainingPlan;
