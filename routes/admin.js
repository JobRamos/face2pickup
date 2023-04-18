var express = require('express');
var router = express.Router();

var slug = require('slug');

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

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        INSERT INTO padres\
        VALUES (null, \'' + req.body.name + '\')'
        /*Image = name.png\*/
            ;

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
                title: 'Admin - Categoría',
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
                title: 'Admin - Editar Categoría',
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
            title: 'Admin - Añadir Categoría',
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
                    SELECT Products.*, Categories.CategoryName\
                    FROM Products\
                    INNER JOIN Categories\
                    ON Products.CategoryID = Categories.CategoryID';

        RunQuery(sqlStr, function (products) {

            var contextDict = {
                title: 'Admin - Productos',
                products: products,
                customer: req.user
            };

            res.render('admin/products', contextDict);
        });
    });

router.route('/products/:id/edit')
    .get(isAdmin, function (req, res, next) {

        var sqlStr = '\
                    SELECT Products.*, Categories.CategoryName\
                    FROM Products\
                    INNER JOIN Categories\
                    ON Products.CategoryID = Categories.CategoryID\
                    WHERE ProductID = ' + req.params.id;

        RunQuery(sqlStr, function (product) {

            sqlStr = '\
                SELECT *\
                FROM Categories';

            RunQuery(sqlStr, function (categories) {
                var contextDict = {
                    title: 'Admin - Editar Producto',
                    product: product[0],
                    categories: categories,
                    customer: req.user
                };

                res.render('admin/editProduct', contextDict);
            });
        });
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        UPDATE Products\
        SET ProductName = \'' + req.body.name + '\', \
            CategoryID = ' + req.body.category + ', \
        WHERE ProductID = ' + req.params.id;

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/products');
        });
    });

router.route('/products/:id/delete')
    .post(isAdmin, function (req, res, next) {

        var sqlStr = '\
            DELETE FROM Products\
            WHERE ProductID = ' + req.params.id;

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
                    title: 'Admin - Add Product',
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
            INSERT INTO Products\
            VALUES (null, \'' + req.body.name + '\', \''
                + req.body.category + '\', \''
                + req.body.padre1 + '\', \''
                + req.body.padre2 + '\', \''
                + req.body.padre3 + '\')';

            console.log(sqlStr);

        RunQuery(sqlStr, function (category) {
            res.redirect('/admin/products');
        });
    });

router.route('/orders')
    .get(isAdmin, function (req, res) {

        var selectQuery = '\
            SELECT *\
            FROM Orders';

        RunQuery(selectQuery, function (orders) {

            var contextDict = {
                title: 'Admin - Asistencia',
                customer: req.user,
                orders: orders
            };

            res.render('admin/orders', contextDict);
        });
    });

router.route('/orders/:id')
    .get(isAdmin, function (req, res) {
        //get order info
        var selectQuery = '\
            SELECT *\
            FROM Orders\
            WHERE OrderID = ' + req.params.id;

        RunQuery(selectQuery, function (order) {
            //get user info
            selectQuery = '\
            SELECT *\
            FROM Users\
            WHERE UserID = ' + order[0].UserID;

            RunQuery(selectQuery, function (orderCustomer) {
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
                            title: 'Admin - Ordenes',
                            customer: req.user,
                            order: order[0],
                            orderCustomer: orderCustomer[0],
                            products: products
                        };

                        res.render('admin/viewOrder', contextDict);
                    });
                });
            });
        });
    });

router.route('/orders/:id/update')
    .get(isAdmin, function (req, res, next) {

        var selectQuery = '\
            SELECT *\
            FROM Orders\
            WHERE OrderID = ' + req.params.id;

        RunQuery(selectQuery, function (order) {

            selectQuery = '\
                SELECT 1';

            RunQuery(selectQuery, function (address) {

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
                    var contextDict = {
                        title: 'Admin - Actualizar Estatus de Orden ' + req.params.id,
                        customer: req.user,
                        order: order[0],
                        products: products
                    };

                    res.render('admin/updateOrder', contextDict);

                });
            });
        });
    })

    .post(isAdmin, function (req, res, next) {
        var sqlStr = '\
        UPDATE Orders\
        SET Status = \'' + req.body.status + '\' \
        WHERE OrderID = ' + req.params.id;

        RunQuery(sqlStr, function (result) {
            res.redirect('/admin/orders');
        });
    });

router.route('/customers')
    .get(isAdmin, function (req, res) {

        var selectQuery = '\
            SELECT *\
            FROM Users INNER JOIN categories ON users.Grupo = categories.CategoryID';

        RunQuery(selectQuery, function (customers) {

            var contextDict = {
                title: 'Admin - Usuarios',
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
                title: 'Admin - Add Profesor',
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