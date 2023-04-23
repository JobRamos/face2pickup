var express = require('express');
var router = express.Router();

var slug = require('slug');

const multer = require('multer');

const upload =multer({storage:multer.memoryStorage()});


// database module
var database = require('../config/database');
var RunQuery = database.RunQuery;

function isAdmin(req, res, next) {

    if (req.isAuthenticated()) {
        if (req.user.Admin == 1) {
            return next();
        }
        else {
            res.redirect('/usr/' + req.user.Username);
        }
    }

    res.redirect('/');
}


router.route('/')
    .get(isAdmin, function (req, res, next) {
        res.redirect('/admin/cat');
        /*var contextDict = {
         title: 'Admin',
         customer: req.user
         };
         res.render('admin/admin', contextDict);*/
    });


router.route('/padres')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
        SELECT *\
        FROM padres';

        RunQuery(sqlStr, function (padres) {
            var contextDict = {
                title: 'Admin - Padres',
                padres: padres,
                customer: req.user
            };

            res.render('admin/padres', contextDict);
        });
    });

router.route('/padres/add')
    .get(isAdmin, function (req, res, next) {
        var contextDict = {
            title: 'Admin - Añadir padre de familia',
            customer: req.user
        };

        res.render('admin/addPadre', contextDict);
    })

    .post(isAdmin, upload.single("ProductImage"), function (req, res) {
        imageFile = req.file.buffer.toString('base64');

        var sqlStr = '\
        INSERT INTO padres\
        VALUES (null, \'' + req.body.name + '\', \'' + imageFile + '\')'
        /*Image = name.png\*/
            ;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/padres');
        });
    });

router.route('/padres/:id/edit')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
        SELECT *\
        FROM padres\
        WHERE PadreID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            var contextDict = {
                title: 'Admin - Editar padre',
                category: category[0],
                customer: req.user
            };

            res.render('admin/editPadre', contextDict);
        });
    })

    .post(isAdmin, upload.single("ProductImage"), function (req, res, next) {
        imageFile = req.file.buffer.toString('base64');
        var sqlStr = 'UPDATE padres SET PadreNombre = \'' + req.body.name + '\' , PadreFoto = \'' + imageFile + '\' WHERE PadreID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/padres');
        });
    });

router.route('/padres/:id/delete')
    .post(isAdmin, function (req, res, next) {
        sqlStr = '\
            DELETE FROM padres\
            WHERE PadreID = ' + req.params.id;

        RunQuery(sqlStr, function (result) {
            res.redirect('/admin/padres');
        });
    });

router.route('/cat')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
        SELECT *\
        FROM Categories';

        RunQuery(sqlStr, function (categories) {
            var contextDict = {
                title: 'Admin - Grupos',
                categories: categories,
                customer: req.user
            };

            res.render('admin/categories', contextDict);
        });
    });

router.route('/cat/:id/edit')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
        SELECT *\
        FROM Categories\
        WHERE CategoryID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            var contextDict = {
                title: 'Admin - Editar grupo',
                category: category[0],
                customer: req.user
            };

            res.render('admin/editCat', contextDict);
        });
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        UPDATE Categories\
        SET CategoryName = \'' + req.body.name + '\' ' +
            
                /*Image = name.png\*/
            'WHERE CategoryID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/cat');
        });
    });

router.route('/cat/:id/delete')
    .post(isAdmin, function (req, res, next) {
        sqlStr = '\
            DELETE FROM Categories\
            WHERE CategoryID = ' + req.params.id;

        RunQuery(sqlStr, function (result) {
            res.redirect('/admin/cat');
        });
    });

router.route('/cat/add')
    .get(isAdmin, function (req, res, next) {
        var contextDict = {
            title: 'Admin - Añadir grupo',
            customer: req.user
        };

        res.render('admin/addCat', contextDict);
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        INSERT INTO Categories\
        VALUES (null, \'' + req.body.name + '\')'
        /*Image = name.png\*/
            ;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/cat');
        });
    });

router.route('/products')
    .get(isAdmin, function (req, res, next) {
        var sqlStr = '\
                    SELECT * FROM Students';

        RunQuery(sqlStr, function (products) {

            var contextDict = {
                title: 'Admin - Alumnos',
                products: products,
                customer: req.user
            };

            res.render('admin/products', contextDict);
        });
    });

router.route('/products/:id/edit')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
                    SELECT * FROM Students WHERE ID_Student = ' + req.params.id;

        RunQuery(sqlStr, function (product) {

            sqlStr = '\
                SELECT *\
                FROM Categories';

            RunQuery(sqlStr, function (categories) {
                sqlStr = '\
                    SELECT *\
                    FROM padres';

                RunQuery(sqlStr, function (padres) {
                    var contextDict = {
                        title: 'Admin - Editar Alumno',
                        product: product[0],
                        categories: categories,
                        padres: padres,
                        customer: req.user
                    };

                    res.render('admin/editProduct', contextDict);
                });
            });
        });
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        UPDATE Students\
        SET StudentName = \'' + req.body.name + '\', \
            Grupo = \'' + req.body.category + '\', \
            Tutor_1 = \'' + req.body.padre1 + '\', \
            Tutor_2 = \'' + req.body.padre2 + '\', \
            Tutor_3 = \'' + req.body.padre3 + '\' \
            WHERE ID_Student = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/products');
        });
    });

router.route('/products/:id/delete')
    .post(isAdmin, function (req, res, next) {

        var sqlStr = '\
            DELETE FROM Students\
            WHERE ID_Student = ' + req.params.id;

        RunQuery(sqlStr, function (result) {
            res.redirect('/admin/products');
        });
    });

router.route('/products/add')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
            SELECT *\
            FROM Categories';

        RunQuery(sqlStr, function (categories) {

            var sqlStr2 = '\
            SELECT *\
            FROM padres';


            RunQuery(sqlStr2, function (padres) {

    
    
                var contextDict = {
                    title: 'Admin - Añadir padre',
                    categories: categories,
                    padres: padres,
                    customer: req.user
                };
    
                res.render('admin/addProduct', contextDict);
            });
        });
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
            INSERT INTO Students\
            VALUES (null, \'' + req.body.name + '\', \''
                + req.body.padre1 + '\', \''
                + req.body.padre2 + '\', \''
                + req.body.padre3 + '\', \''
                + req.body.category + '\', null)';


            console.log(sqlStr);

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/products');
        });
    });


router.route('/cat/:id/edit')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
        SELECT *\
        FROM Categories\
        WHERE CategoryID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            var contextDict = {
                title: 'Admin - Editar grupo',
                category: category[0],
                customer: req.user
            };

            res.render('admin/editCat', contextDict);
        });
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        UPDATE Categories\
        SET CategoryName = \'' + req.body.name + '\' ' +
            
                /*Image = name.png\*/
            'WHERE CategoryID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/cat');
        });
    });

router.route('/orders')
    .get(isAdmin, function (req, res) {

        var selectQuery = '\
            SELECT *\
            FROM asistencia';

        RunQuery(selectQuery, function (asistencias) {

            var contextDict = {
                title: 'Admin - Asistencia',
                customer: req.user,
                asistencias: asistencias
            };

            res.render('admin/orders', contextDict);
        });
    });

router.route('/customers')
    .get(isAdmin, function (req, res) {

        var selectQuery = '\
            SELECT *\
            FROM Users INNER JOIN categories ON users.Grupo = categories.CategoryID';

        RunQuery(selectQuery, function (customers) {

            var contextDict = {
                title: 'Admin - Profesores',
                customer: req.user,
                customers: customers
            };

            res.render('admin/customers', contextDict);
        });
    });

router.route('/customers/add')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
            SELECT *\
            FROM Categories';

        RunQuery(sqlStr, function (categories) {
            var contextDict = {
                title: 'Admin - Añadir Profesor',
                categories: categories,
                customer: req.user
            };

            res.render('admin/addProfesor', contextDict);
        });
    })

    .post(isAdmin, function (req, res, next) {

        var passwordHash = bcrypt.hashSync(password, null, null);
        var sqlStr = '\
            INSERT INTO Users\
            VALUES (null, \'' + req.body.fullName + '\', '
                + req.body.phone + ', '
                + req.body.email + ', '
                + req.body.username + ', '
                + req.body.category + ', '
                + passwordHash + '\', 0)';


            console.log(sqlStr);

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/customers');
        });
    });


router.route('/customers/:id/makeAdmin')
    .post(isAdmin, function (req, res) {

        var updateQuery = '\
            UPDATE Users\
            SET Admin = 1\
            WHERE UserID = ' + req.params.id;

        RunQuery(updateQuery, function (result) {

            res.redirect('/admin/customers/');
        });
    });

router.route('/customers/:id/removeAdmin')
    .post(isAdmin, function (req, res) {

        var updateQuery = '\
            UPDATE Users\
            SET Admin = 0\
            WHERE UserID = ' + req.params.id;

        RunQuery(updateQuery, function (result) {

            res.redirect('/admin/customers/');
        });
    });

router.route('/customers/:id/delete')
    .post(isAdmin, function (req, res) {

        var deleteQuery = '\
            DELETE FROM Users\
            WHERE UserID = ' + req.params.id;

        RunQuery(deleteQuery, function (result) {

            res.redirect('/admin/customers/');
        });
    });

module.exports = router;