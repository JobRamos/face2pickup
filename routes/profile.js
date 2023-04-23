var express = require('express');
var router = express.Router();

var bcrypt = require('bcrypt-nodejs');

// database module
var database = require('../config/database');
var RunQuery = database.RunQuery;

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

router.route('/')
    .get(function (req, res) {
        if (req.isAuthenticated()) {
            if (req.user.Admin == 1) {
                res.redirect('/admin');
            }
            else {
                res.redirect('/usr/' + req.user.Username);
            }
        }
        res.redirect('/');
    });

router.route('/:username')
    .get(isLoggedIn, function (req, res) {

        res.render('profile/profile', {
            title: req.user.FullName,
            customer: req.user
        });
    });

router.route('/:username/edit')
    .get(isLoggedIn, function (req, res) {
        res.render('profile/editProfile', {
            title: req.user.FullName,
            customer: req.user
        });
    })

    .post(isLoggedIn, function (req, res) {
        var form = req.body;
        if (bcrypt.compareSync(form.password, req.user.Password)) {
            var updateQuery = '\
                UPDATE Users\
                SET Fullname = \'' + form.fullName + '\', \
                    Email = \'' + form.email + '\', \
                    Phone = \'' + form.phone + '\' \
                WHERE UserID = ' + req.user.UserID;

            RunQuery(updateQuery, function (result) {
                res.redirect('/usr/' + req.user.Username);
            });
        }
        else {
            //password wrong
        }
    });

router.route('/:username/change-password')
    .get(isLoggedIn, function (req, res) {
        res.render('profile/changePassword', {
            title: req.user.FullName,
            customer: req.user
        });

    })

    .post(isLoggedIn, function (req, res) {
        var form = req.body;
        if (form.newPassword == form.repeatPassword) {
            if (bcrypt.compareSync(form.currentPassword, req.user.Password)) {
                var passwordHash = bcrypt.hashSync(form.newPassword, null, null);
                var updateQuery = '\
                UPDATE Users\
                SET Password = \'' + passwordHash + '\' \
                WHERE UserID = ' + req.user.UserID;

                RunQuery(updateQuery, function (result) {
                    res.redirect('/usr/' + req.user.Username);

                });
            }
            else {
                //password wrong
            }
        }
        else {
            //passwords are not matched
        }
    });

    // asistencia diaria
router.route('/:Grupo/asistencia')
    .get(isLoggedIn, function (req, res) {

        var selectQuery = 'SELECT * FROM asistencia WHERE grupo = \'' + req.user.CategoryName + '\' AND DATE(fecha) = CURDATE() ORDER BY fecha ASC';

        RunQuery(selectQuery, function (orders) {
            res.render('profile/asistencia', {
                title: req.user.FullName,
                customer: req.user,
                orders: orders
            });
        });
    });

router.route('/:Grupo/orders')
    .get(isLoggedIn, function (req, res) {

        var selectQuery = '\
        SELECT * FROM Students WHERE Grupo = ' + '\'' + req.user.CategoryName+ '\'';

        RunQuery(selectQuery, function (orders) {
            res.render('profile/orders', {
                title: req.user.FullName,
                customer: req.user,
                orders: orders
            });
        });
    });

router.route('/:username/orders/:id')
    .get(isLoggedIn, function (req, res) {
        //get order info
        var selectQuery = '\
            SELECT *\
            FROM Orders\
            WHERE OrderID = ' + req.params.id;

        RunQuery(selectQuery, function (order) {
            //get delivery info
            selectQuery = '\
                SELECT 1';

            RunQuery(selectQuery, function (address) {
                //get order info
                selectQuery = '\
                    SELECT *\
                    FROM `Order Details`\
                    INNER JOIN (\
                        SELECT Products.*, Categories.CategoryName\
                        FROM Products\
                        INNER JOIN Categories\
                        ON Products.CategoryID = Categories.CategoryID\
                    ) `Table`\
                    ON `Order Details`.ProductID = `Table`.ProductID\
                    WHERE OrderID = ' + order[0].OrderID;

                RunQuery(selectQuery, function (products) {
                    //get order info

                    var contextDict = {
                        title: req.user.FullName,
                        customer: req.user,
                        order: order[0],
                        address: address[0],
                        products: products
                    };

                    res.render('profile/viewOrder', contextDict);
                });
            });
        });
    });

    router.route('/asistencia/:id/confirmar')
    .post(isLoggedIn, function (req, res) {

        var updateQuery = '\
            UPDATE asistencia\
            SET estatus = 1\
            WHERE AsistenciaID = ' + req.params.id;

        RunQuery(updateQuery, function (result) {
            

            var selectQuery = 'SELECT * FROM asistencia\
            WHERE grupo = \'' + req.user.CategoryName + '\' ORDER BY fecha ASC';


            RunQuery(selectQuery, function (orders) {
                res.render('profile/asistencia', {
                    title: req.user.FullName,
                    customer: req.user,
                    orders: orders
                });
            });

        });
    });

router.route('/asistencia/:id/anular')
    .post(isLoggedIn, function (req, res) {

        var updateQuery = '\
            UPDATE asistencia\
            SET estatus = 0\
            WHERE AsistenciaID = ' + req.params.id;

        RunQuery(updateQuery, function (result) {
            

            var selectQuery = 'SELECT * FROM asistencia\
            WHERE grupo = \'' + req.user.CategoryName + '\' ORDER BY fecha ASC';


            RunQuery(selectQuery, function (orders) {
                res.render('profile/asistencia', {
                    title: req.user.FullName,
                    customer: req.user,
                    orders: orders
                });
            });

        });
    });

module.exports = router;