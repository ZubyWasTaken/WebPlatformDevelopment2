const trainingplanDAO = require("../models/trainingplanModel");
const db = new trainingplanDAO();
const userDao = require("../models/userModel.js");

// initializes the database and creates database by calling init function
db.init();

exports.entries_list = function (req, res) {
    res.send("<h1>Not yet implemented: show users training plan.</h1>");
    // displays all entries to console for debugging.
    db.getAllEntries();
};

exports.delete_entry = function (req, res) {
    //for debugging - to see if the correct ID of entry is selected
    console.log("ID of entry is", req.params.id);
    //sets that ID of entry to a variable
    let id = req.params.id;
    //passes ID into function
    db.deleteEntry(id);
    //redirects user to root
    res.redirect("/");
};

exports.show_user_entries = function (req, res) {
    //for debugging - shows if correct author when name is clicked
    console.log("filtering author name", req.params.author);

    // sets author to variable
    let user = req.params.author;
    // passes author into function which returns all entries by that author
    db.getEntriesByUser(user)
        .then((entries) => {
            res.render("entries", {
                title: "Training Plan",
                entries: entries,
            });
        })
        .catch((err) => {
            // if an error occurs displaying them, display error in console
            console.log("error handling author posts", err);
        });
};

exports.landing_page = function (req, res) {
    // gets all entries from database and renders to root page
    db.getAllEntries()
        .then((list) => {
            res.render("entries", {
                title: "Training Plan",
                entries: list,
                user: req.user,
            });
            // prints to console if all entires have been retrieved properly
            console.log("promise resolved");
        })
        .catch((err) => {
            // prints to console if all entires have not been retrieved properly
            console.log("promise rejected", err);
        });
};

exports.post_new_entry = function (req, res) {
    // for debugging - to show button click worked
    console.log("processing post-new_entry controller");
    if (!req.body.author) {
        // only happens if the entry doesn't have an author
        response.status(400).send("Entries must have an author.");
        return;
    }
    //calls function to add entry to database
    db.addEntry(req.body.author, req.body.subject, req.body.contents);
    // redirects to root
    res.redirect("/");
};

exports.show_new_entries = function (req, res) {
    //renders newEntry page where user enters their details for their new entry
    res.render("newEntry", {
        title: "Training Plan",
    });
};

exports.show_register_page = function (req, res) {
    res.render("user/register");
};

exports.post_new_user = function (req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    console.log("register user", user, "password", password);
    if (!user || !password) {
        res.send(401, "no user or no password");
        return;
    }
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        userDao.create(user, password);
        res.redirect("/login");
    });
};

exports.show_login_page = function (req, res) {
    res.render("user/login", {
        title: "Training Plan",
    });
};

exports.authorize = function (redirect) {
    return passport.authenticate("local", { failureRedirect: redirect });
};

exports.post_login = function (req, res) {
    res.redirect("/");
};

exports.show_user_entries = function (req, res) {
    let user = req.params.author;
    db.getEntriesByUser(user)
        .then((entries) => {
            res.render("entries", {
                title: "Training Plan",
                user: req.user,
                entries: entries,
            });
        })
        .catch((err) => {
            console.log("Error: ");
            console.log(JSON.stringify(err));
        });
};

exports.logout = function (req, res) {
    req.logout();
    res.redirect("/");
};

exports.show_new_entries = function (req, res) {
    res.render("newEntry", {
        title: "Guest Book",
        user: req.user,
    });
};

exports.server_error = function (err, req, res, next) {
    // occurs when an error 500 occurs
    res.status(500);
    res.type("text/plain");
    res.send("Internal Server Error.");
};
