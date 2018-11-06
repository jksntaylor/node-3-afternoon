const users = require('../models/users');

let id = 1;

module.exports = {

    login(req, res, next) {
        let {username, password} = req.body;
        let user = users.find(user => user.username === username && user.password === password);

        if (user) {
            req.session.user.username = user.username;
            res.status(200).send(req.session.user);
        } else {
            res.status(403).send('Unauthorized.');
        }
    },

    register(req, res, next) {
        let {username, password} = req.body;
        users.push({id, username, password})
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user);
    },

    signout(req, res, next) {
        req.session.destroy();
        res.status(200).send(req.session);
    },

    getUser(req, res, next) {
        res.status(200).send(req.session.user)
    }
}