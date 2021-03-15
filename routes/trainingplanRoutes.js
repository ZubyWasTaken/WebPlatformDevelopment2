const express = require("express");
const router = express.Router();
const controller = require("../controllers/trainingplanControllers");

router.get("/", controller.landing_page);

router.get("/trainingplan", controller.entries_list);

router.get('/new', controller.show_new_entries);

router.post('/new', controller.post_new_entry);

router.get('/posts/:author', controller.show_user_entries);

router.get("/about", function (req, res) {
    res.redirect("/about.html");
});

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