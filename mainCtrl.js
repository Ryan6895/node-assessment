var users = require('./users.json');
module.exports = {
    getUsers: function(req, res, next) {
        var one = [];
        for (var i = 0; i < users.length; i++) {
            var value = true;
            for (var key in req.query) {
                if (users[i][key] != req.query[key]) {
                    value = false;
                    break;
                }
            }
            if (value) {
                one.push(users[i])
            }
        }
        res.status(200).json(one);
    },
    //  getPriviledge: function (req, res, next) {
    //    let one = [];
    //    for (var i = 0; i < users.length; i++) {
    //      if (users[i].type == req.params.admin){
    //        one.push(users[i]);
    //      }
    //    }
    //    res.status(200).json(one);
    //  },
    getIdorAdmin: function(req, res, next) {
        let one = [];
        if (parseInt(req.params.Id)) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].id == req.params.Id) {
                    one.push(users[i]);
                }
            }
            if (!one.length) return res.status(404).send("User not found")
            res.status(200).json(one[0]);
        } else {
            for (var i = 0; i < users.length; i++) {
                if (users[i].type == req.params.Id) {
                    one.push(users[i]);
                }
            }
            if (!one.length) return res.status(404).send("User not found")
            res.status(200).json(one);
        }
    },
    //  getId: function (req, res, next) {
    //    let one = [];
    //    for (var i = 0; i < users.length; i++) {
    //      if (users[i].id == req.params.id) {
    //        one.push(users[i]);
    //      }
    //    }
    //    if (!one.length) return res.status(404).send("User not found")
    //    res.status(200).json(one[0]);
    //  },
    postUser: function(req, res) {
        req.body.favorites = req.body.favorites.splice(', ');
        users.push(req.body);
        res.status(200).json(req.body);
    },
    //  postAdmin: function(req, res, next) {
    //    req.body.favorites = req.body.favorites.splice(', ');
    //    users.push(req.body);
    //    res.status(200).json(req.body);
    //  },
    putLanguage: function(req, res, next) {
        var user;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users[i].language = req.body.language;
                user = users[i]
            }
        }
        res.status(200).json(user);
    },
    putForum: function(req, res, next) {
        var user;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users[i].favorites.push(req.body);
                user = users[i];
            }
        }
        res.status(200).json(user);
    },
    deleteForums: function(req, res, next) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                for (var j = 0; j < users[i].favorites.length; j++) {
                    if (users[i].favorites[j] == req.query.favorite) {
                        users[i].favorites.splice(j, 1);
                    }
                }
            }
        }
        res.status(200).json(users);
    },
    deleteUser: function(req, res, next) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == req.params.id) {
                users.splice(i, 1);
            }
        }
        res.status(200).json(users);
    }
}
