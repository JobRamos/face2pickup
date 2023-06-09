var express = require('express');
var router = express.Router();

// database module
var database = require('../config/database');
var RunQuery = database.RunQuery;

/* Route Home page. */
router.all('/', function (req, res, next) {
    var sqlStr = '\
        SELECT *\
        FROM Categories';

    RunQuery(sqlStr, function (categories) {
        sqlStr = '\
            SELECT Students.*, Categories.CategoryName, Categories.CategoryName\
            FROM Students\
            INNER JOIN Categories\
            ON Students.Grupo = Categories.CategoryID';

        RunQuery(sqlStr, function (products) {
            var contextDict = {
                currentUrl: '/',
                title: 'Inicio',
                categories: categories,
                featProducts: products,
                customer: req.user
            };

            //isLoggedIn(req, contextDict);
            res.render('sign-in', contextDict);
        });
    });
});






/* Route Category page. */
router.route('/cat/')
    .all(function (req, res, next) {
        var sqlStr = '\
        SELECT *\
        FROM Categories';

        RunQuery(sqlStr, function (categories) {
            var contextDict = {
                currentUrl: '/cat',
                title: 'Categories',
                categories: categories,
                customer: req.user
            };

            res.render('categories', contextDict);
        });
    });

/* Route Category Products page. */
router.route('/cat/:catSlug')
    .all(function (req, res, next) {
        if (req.params.catSlug == "all") {
            var selectQuery = '\
                SELECT Students.*, Categories.CategoryName, Categories.CategoryName\
                FROM Students\
                INNER JOIN Categories\
                ON Students.Grupo = Categories.CategoryID';

            RunQuery(selectQuery, function (products) {

                selectQuery = '\
                SELECT *\
                FROM Categories';

                RunQuery(selectQuery, function (categories) {

                    var contextDict = {
                        title: 'Todos los Productos',
                        products: products,
                        categories: categories,
                        customer: req.user
                    };

                    res.render('categoryProducts', contextDict);
                });
            });
        }
        else if (req.params.catSlug == "buscar"){
            var sqlStr = '\
                SELECT Students.* FROM Students';

            RunQuery(sqlStr, function (products) {

                sqlStr = '\
                SELECT *\
                FROM Categories';

                RunQuery(sqlStr, function (categories) {

                    var contextDict = {
                        title: 'Resultado de busqueda: ' + req.body.buscador,
                        products: products,
                        categories: categories,
                        customer: req.user,
                        buscador: req.body.buscador
                    };

                    res.render('categoryProducts', contextDict);
                });
            });
        } else {
            var sqlStr = '\
                SELECT Students.*, Categories.CategoryName, Categories.CategoryName\
                FROM Students\
                INNER JOIN Categories\
                ON Students.Grupo = Categories.CategoryID\
                WHERE Categories.CategoryName = \'' + req.params.catSlug + '\'';

            RunQuery(sqlStr, function (products) {

                sqlStr = '\
                SELECT *\
                FROM Categories';

                RunQuery(sqlStr, function (categories) {

                    var contextDict = {
                        title: products[0].CategoryName,
                        products: products,
                        categories: categories,
                        customer: req.user
                    };

                    res.render('categoryProducts', contextDict);
                });
            });
        }
    });

/* Route Product page. */
router.route('/cat/:catSlug/:prodSlug')
    .all(function (req, res, next) {
        var sqlStr = '\
        SELECT *\
        FROM Students\
        WHERE ProductSlug = \'' + req.params.prodSlug + '\'';

        RunQuery(sqlStr, function (product) {

            var contextDict = {
                title: product[0].ProductName,
                product: product[0],
                customer: req.user
            };

            res.render('productDetail', contextDict);
        });
    });

    
/* Route Login page.
 router.route('/login/')
 .get (function (req, res, next) {
 var contextDict = {
 title: 'Login'
 };
 res.render('login', contextDict);
 });

 .post(function (req, res, next) {
 //read inputs
 //validate inputs
 //redirect to account info page
 var contextDict = {
 title: '',
 signInError: req.flash('loginError')
 };
 res.render('template', contextDict);
 });
 */

module.exports = router;
