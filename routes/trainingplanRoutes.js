const express = require("express");
const router = express.Router();
const controller = require("../controllers/trainingplanControllers");
const auth = require("../auth/auth");
const { ensureLoggedIn } = require("connect-ensure-login");

router.get("/", controller.landing_page);

router.get("/trainingplan", controller.entries_list);

router.get("/new", ensureLoggedIn("/login"), controller.show_new_entries);

// router.post("/new", ensureLoggedIn("/login"), controller.post_new_entry);

// router.post("/new", ensureLoggedIn("/login"), controller.post_new_entry);

router.post("/new", ensureLoggedIn("/login"), controller.post_new_week);

router.get("/delete/:id", controller.delete_entry);

router.get("/user/:author", controller.show_user_entries);

router.get("/user/:author/:id", controller.show_single_entry);

router.get("/:id/edit", controller.show_edit_page);

router.get("/register", controller.show_register_page);

router.post("/register", controller.post_new_user);

router.get("/about", function (req, res) {
    res.redirect("/about.html");
});

router.get("/login", controller.show_login_page);

router.post("/login", auth.authorize("/login"), controller.post_login);

router.get("/logout", controller.logout);



router.use(function (req, res) {
    res.status(404);
    res.type("text/plain");
    res.send("404 Not found.");
});

router.use(function (err, req, res, next) {
    res.status(500);
    res.type("text/plain");
    res.send("Internal Server Error.");
});

module.exports = router;
