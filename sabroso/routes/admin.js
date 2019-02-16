var express = require('express');
var users = require('./../inc/users');
var router = express.Router();


// Middleware
router.use((req, res, next) => {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect("/admin/login");
    } else {
        next();
    }
    // console.log("Middleware: ", req.url);

});


router.get("/logout", (req, res, next) => {

    delete req.session.user;

    res.redirect("/admin/login");

});


router.get("/", (req, res, next) => {

    res.render("admin/index");

});


router.post("/login", (req, res, next) => {

    if (!req.body.email) {
        users.render(req, res, "Preencha los campos e-mail.");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha los campos senha.");
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user; // guardando na variavel de session
            res.redirect("/admin"); //dados corretos, e redireciona para Admin
        }).catch (err => {
            users.render(req, res, err.message || err);
        });
    }

});


router.get("/login", (req, res, next) => {

    // if (!req.session.views) req.session.views = 0; // verifica el numero de sesion

    users.render(req, res, null);

});


router.get("/contacts", (req, res, next) => {

    res.render("admin/contacts");

});


router.get("/emails", (req, res, next) => {

    res.render("admin/emails");

});


router.get("/menus", (req, res, next) => {

    res.render("admin/menus");

});


router.get("/reservations", (req, res, next) => {

    res.render("admin/reservations", {
        date: {}
    });

});


router.get("/users", (req, res, next) => {

    res.render("admin/users");

});


module.exports = router;