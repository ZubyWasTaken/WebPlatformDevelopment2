const Datastore = require("nedb");

class TrainingPlan {
    constructor(dbFilePath) {
        this.db = new Datastore({ filename: "database.db", autoload: true });
    }

    //a function to seed the database initially
    init() {
        this.db.insert({
            subject: "Run more",
            contents:
                "I want to run more often - at least three times per week.",
            published: "2020-02-16",
            author: "Zuby",
        });
        //for later debugging
        console.log("example database entry 1 inserted");

        this.db.insert({
            subject: "More situps",
            contents:
                "I want to do more situps a week - at least 500 in a week.!",
            published: "2020-02-18",
            author: "Zubair",
        });
        //for later debugging
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
    addEntry(author, subject, contents) {
        var entry = {
            author: author,
            subject: subject,
            contents: contents,
            published: new Date().toISOString().split("T")[0],
        };
        console.log("entry created", entry);

        this.db.insert(entry, function (err, doc) {
            if (err) {
                console.log("Error inserting document", subject);
            } else {
                console.log("document inserted into the database", doc);
            }
        });
    }

    // Function to remove a specific entry from the database
    deleteEntry(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, function (err, res) {
                if (err) {
                    reject(err);
                } else {
                    console.log(
                        "removed entry with ID of ",
                        id,
                        " from database"
                    );
                }
            });
        });
    }

    // Returns entries that match a specific author
    getEntriesByUser(authorName) {
        return new Promise((resolve, reject) => {
            this.db.find({ author: authorName }, function (err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                    console.log(
                        "function getEntriesByUser() returns: ",
                        entries
                    );
                }
            });
        });
    }
}

module.exports = TrainingPlan;
