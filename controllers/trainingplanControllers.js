const trainingplanDAO = require("../models/trainingplanModel");
const db = new trainingplanDAO();
const userDao = require("../models/userModel.js");

// initializes the database and creates database by calling init function
db.init();

exports.landing_page = function (req, res) {
    // gets all entries from database and renders to 'Entries'
    db.getAllEntries()
        .then((list) => {
            res.render("entries", {
                title: "Training Plan",
                entries: list,
                user: req.user,
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

// Renders the 'newEntry' page
// This page is used for users to enter a new entry into the training plan
exports.show_new_entries = function (req, res) {
    res.render("newEntry", {
        title: "New Entry",
    });
};

// Renders the 'user/login' page
// This page is used for users to login to the website
exports.show_login_page = function (req, res) {
    res.render("user/login", {
        title: "Login",
    });
};

// Redirects the user to the root page once they have been authorized
exports.post_login = function (req, res) {
    res.redirect("/");
};

// Renders the 'user/register' page
exports.show_register_page = function (req, res) {
    res.render("user/register");
};

// Post request for 'user/register'
exports.post_new_user = function (req, res) {
    //gets user and password from the body of the request that was submitted from the form
    const user = req.body.username;
    const password = req.body.pass;

    // if either field are empty, send error 401 and error message
    if (!user || !password) {
        res.send(401, "no user or no password");
        return;
    }
    // look up if the user already exists, if so send error 401 and error message
    userDao.lookup(user, function (err, u) {
        if (u) {
            res.send(401, "User exists:", user);
            return;
        }
        // create new user using previous details and redirect to '/login' page
        userDao.create(user, password);
        res.redirect("/login");
    });
};

// renders the 'newEntry' page where the user will create a new training plan entry
exports.show_new_entries = function (req, res) {
    res.render("newEntry", {
        title: "Guest Book",
        user: req.user.user,
    });
};

exports.show_user_entries = function (req, res) {
    // gets current user of name clicked
    let user = req.params.author;
    //get all entries by that user, and render 'entries' page with those entries
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

exports.show_single_entry = function (req, res) {
    // gets id of current training plan
    let id = req.params.id;

    //looks up that entry from the id, and renders 'singlePlan' which displays that one entry
    db.getEntryByID(id)
        .then((entries) => {
            res.render("singlePlan", {
                title: "Individual Training Plan",
                user: req.user,
                entries: entries,
            });
        })
        .catch((err) => {
            console.log("Error: ");
            console.log(JSON.stringify(err));
        });
};

exports.show_my_plans = function (req, res) {
    // gets all entries from the current logged in user, and renders 'myPosts' which displays
    // all posts from that current logged in user
    db.getEntriesByUser(req.user.user)
        .then((list) => {
            res.render("myPosts", {
                title: "My Training Plans",
                entries: list,
                user: req.user.user,
            });
            console.log("promise resolved");
        })
        .catch((err) => {
            console.log("promise rejected", err);
        });
};

exports.show_user_entries = function (req, res) {
    // sets name of author clicked to variable
    let user = req.params.author;
    // passes author into function which returns all entries by that user and renders
    // 'entries', and displays those entries from that user
    db.getEntriesByUser(user)
        .then((entries) => {
            res.render("entries", {
                title: "Training Plan",
                entries: entries,
            });
        })
        .catch((err) => {
            console.log("error handling author posts", err);
        });
};

exports.delete_entry = function (req, res) {
    //sets that ID of entry to variable
    let id = req.params.id;

    //passes ID into function
    db.deleteEntry(id);

    //redirects user to root
    res.redirect("/");
};

exports.show_edit_page = function (req, res) {
    // sets ID of entry that was selected via button to variable
    let id = req.params.id;

    //looks up that entry with that ID and returns it
    // renders 'editPage' for the user and passes in that single entry
    db.getEntryByID(id)
        .then((entries) => {
            res.render("editPage", {
                title: "Editing Training Plan",
                user: req.user.user,
                entries: entries,
            });
        })
        .catch((err) => {
            console.log("Error: ");
            console.log(JSON.stringify(err));
        });
};

exports.post_new_week = function (req, res) {
    if (!req.body) {
        // only happens if the entry doesn't have an author
        response.status(400).send("Entry failed.");
        res.redirect("/");
        return;
    }
    // create a new week using post request from form in 'editPage'
    // passes in author, title, subject, contents, week, goal1, goal2, goal3
    db.addWeek(
        req.body.author,
        req.body.title,
        req.body.subject,
        req.body.contents,
        req.body.week,
        req.body.goal1,
        req.body.goal2,
        req.body.goal3
    );
    // redirects to root
    res.redirect("/");
};

// used to authorize user
exports.authorize = function (redirect) {
    return passport.authenticate("local", { failureRedirect: redirect });
};

// used to log user out and redirect to root
exports.logout = function (req, res) {
    req.logout();
    res.redirect("/");
};

exports.edit_goal = function (req, res) {
    // sets ID of entry that was selected via button to variable
    let id = req.params.id;

    // deletes that entry
    db.deleteEntry(id);

    if (!req.body) {
        // only happens if the entry doesn't have an author
        response.status(400).send("Entry failed.");
        res.redirect("/");
        return;
    }
    // creates a new entry using post request from 'editPage'
    // passes in author, title, subject, contents, week, goal1, goal2, goal3

    db.addWeek(
        req.body.author,
        req.body.title,
        req.body.subject,
        req.body.contents,
        req.body.week,
        req.body.goal1,
        req.body.goal2,
        req.body.goal3
    );
    // redirects to root
    res.redirect("/");
};

// used for error code 500
exports.server_error = function (err, req, res, next) {
    // occurs when an error 500 occurs
    res.status(500);
    res.type("text/plain");
    res.send("Internal Server Error.");
};
