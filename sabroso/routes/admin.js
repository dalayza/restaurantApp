var express = require('express');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var router = express.Router();


router.use((req, res, next) => {

    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect("/admin/login");
    } else {
        next();
    }

});


router.use((req, res, next)=>{
    req.menus = admin.getMenus(req);
    next();
});


router.get('/', (req, res, next) => {

    admin.dashboard().then(data => {
        res.render('admin/index', admin.getParams(req, {
            data
        }));
    }).catch(err => {
        console.error(err);
    });
    
});


router.get('/contacts', (req, res, next) => {

    res.render('admin/contacts', admin.getParams(req));
});


router.get('/emails', (req, res, next) => {
    res.render('admin/emails', admin.getParams(req));
});


router.get('/menus', (req, res, next) => {
    res.render('admin/menus', admin.getParams(req));
});


router.get('/reservations', (req, res, next) => {
    res.render('admin/reservations', admin.getParams(req,{
        date: {}
    }));
});


router.get('/users', (req, res, next) => {
    res.render('admin/users', admin.getParams(req));
});


// Login e Logout
router.get('/login', (req, res, next) => {

    users.render(req, res);

});


router.post('/login', (req, res, next) => {

    if(!req.body.email) {
        users.render(req, res, "Preencha o e-mail para fazer login.");
    } else if (!req.body.password) {
        users.render(req, res, "Preencha a senha para fazer login.");
    } else {
        users.login(req.body.email, req.body.password).then(user => {
            req.session.user = user;

            res.redirect("/admin");

        }).catch(err => {
            users.render(req, res, err.message || err);
        });
    }
    
});


router.get("/logout", (req, res, next) => {

    delete req.session.user;

    res.redirect('/admin/login');

});


module.exports = router;