const express = require("express");
const router = express.Router();
const controller = require("../controllers/trainingplanControllers");
const auth = require("../auth/auth");
const { ensureLoggedIn } = require("connect-ensure-login");

// get request for root page
router.get("/", controller.landing_page);

// get request for new entry, but makes sure that the user is logged in
router.get("/new", ensureLoggedIn("/login"), controller.show_new_entries);

// post request for new entry, but makes sure that the user is logged in
router.post("/new", ensureLoggedIn("/login"), controller.post_new_week);

// get request to delete a specific post
router.get("/delete/:id", controller.delete_entry);

// get request to display every entry by a specific author
router.get("/user/:author", controller.show_user_entries);

// get request to display a specific entry by a specific author
router.get("/share/:author/:id", controller.show_single_entry);

// get request to edit a specific post. but makes sure the user is logged in
router.get("/:id/edit", ensureLoggedIn("/login"), controller.show_edit_page);

// post request to edit a specific post
router.post("/:id/edit", controller.edit_goal);

// get request to view 'myplans' which shows all of a users entries
// user can edit and delete in this page
router.get("/myplans", ensureLoggedIn("/login"), controller.show_my_plans);

// get request for register page
router.get("/register", controller.show_register_page);

// post request for register page
router.post("/register", controller.post_new_user);

//get request for about page, renders about.html
router.get("/about", function (req, res) {
    res.redirect("/about.html");
});

// get request for '/user', if user goes here they are redirected to root
router.get("/user", function (req, res) {
    res.redirect("/");
});

// get request for '/share', if user goes here they are redirected to root
router.get("/share", function (req, res) {
    res.redirect("/");
});

// get request for '/delete', if user goes here they are redirected to root
router.get("/delete", function (req, res) {
    res.redirect("/");
});

// get request for login page
router.get("/login", controller.show_login_page);

// post request for login page, authorizes users login
router.post("/login", auth.authorize("/login"), controller.post_login);

// get request for user logout
router.get("/logout", controller.logout);

// handles 404 error
router.use(function (req, res) {
    res.status(404);
    res.type("text/plain");
    res.send("404 Not found.");
});

// handles 500 error
router.use(function (err, req, res, next) {
    res.status(500);
    res.type("text/plain");
    res.send("Internal Server Error.");
});

module.exports = router;
