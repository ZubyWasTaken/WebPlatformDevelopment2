const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class UserDAO {
    constructor(dbFilePath) {
        this.db = new Datastore({ filename: "users.db", autoload: true });
    }
    // for the demo the password is the bcrypt of the user name
    // no longer used
    init() {
        // this.db.insert({
        //     user: "Peter",
        //     password:
        //         "$2b$10$I82WRFuGghOMjtu3LLZW9OAMrmYOlMZjEEkh.vx.K2MM05iu5hY2C",
        // });
        // console.log('user record inserted in init');
        // this.db.insert({
        //     user: "Ann",
        //     password:
        //         "$2b$10$bnEYkqZM.MhEF/LycycymOeVwkQONq8kuAUGx6G5tF9UtUcaYDs3S",
        // });
        // console.log('user record inserted in init');
        return this;
    }
    
    // creates a new user account
    create(username, password) {
        const that = this;
        // used to hash the password
        bcrypt.hash(password, saltRounds).then(function (hash) {
            //entry of username and hashed password
            var entry = {
                user: username,
                password: hash,
            };
            console.log("user entry is: ", entry);

            //enters that hashed entry into database
            that.db.insert(entry, function (err) {
                if (err) {
                    console.log("Can't insert user: ", username);
                }
            });
        });
    }

    // looks up user to see if it already exists
    lookup(user, cb) {
        this.db.find({ user: user }, function (err, entries) {
            if (err) {
                return cb(null, null);
            } else {
                if (entries.length == 0) {
                    return cb(null, null);
                }
                return cb(null, entries[0]);
            }
        });
    }
}
const dao = new UserDAO();
dao.init();
module.exports = dao;
