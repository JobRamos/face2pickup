var express = require('express');
var router = express.Router();

// database module
var database = require('../config/database');
var RunQuery = database.RunQuery;

router.route('/')
    .all(function (req, res, next) {

        var wishlist = req.session.wishlist;
        var showwishlist = [];

        for (var item in wishlist) {
            var aItem = wishlist[item];
            if (wishlist[item].quantity > 0) {
                showwishlist.push({
                    Image: aItem.Image,
                    ProductSlug: aItem.ProductSlug,
                    CategorySlug: aItem.CategorySlug,
                    ProductID: aItem.ProductID,
                    ProductName: aItem.ProductName,
                    Description: aItem.Description,
                    ProductPrice: aItem.ProductPrice,
                    quantity: aItem.quantity,
                    productTotal: aItem.productTotal.toFixed(2)
                });
            }
        }

        req.session.showwishlist = showwishlist;

        var contextDict = {
            title: 'wishlist',
            customer: req.user,
            wishlist: showwishlist
        };
        res.render('wishlist', contextDict);
    });



router.route('/:id/delete')
    .post(function (req, res, next) {
        var wishlist = req.session.wishlist;

        wishlist[req.params.id].quantity = 0;
        wishlist[req.params.id].productTotal = 0;

        res.redirect('/wishlist');
    });

router.route('/:id/add')
    .post(function (req, res, next) {
        req.session.wishlist = req.session.wishlist || {};
        var wishlist = req.session.wishlist;

        var selectQuery = '\
            SELECT Products.*, Categories.CategoryName\
            FROM Products\
            INNER JOIN Categories\
            ON Products.CategoryID = Categories.CategoryID\
            WHERE ProductID = ' + req.params.id;

        RunQuery(selectQuery, function (rows) {
            var plusPrice = 0.00;
            var inputQuantity = parseInt(req.body.quantity);

            if (wishlist[req.params.id]) {
                if (inputQuantity) {
                    wishlist[req.params.id].quantity += inputQuantity;
                    plusPrice = wishlist[req.params.id].ProductPrice * inputQuantity;
                    wishlist[req.params.id].productTotal += plusPrice;
                }
                else {
                    wishlist[req.params.id].quantity++;
                    plusPrice = wishlist[req.params.id].ProductPrice;
                    wishlist[req.params.id].productTotal += plusPrice;
                }
            }
            else {
                wishlist[req.params.id] = rows[0];

                if (req.body.quantity) {
                    wishlist[req.params.id].quantity = inputQuantity;
                    plusPrice = wishlist[req.params.id].ProductPrice * inputQuantity;
                    wishlist[req.params.id].productTotal = plusPrice;
                    
                }
                else {
                    rows[0].quantity = 1;
                    plusPrice = wishlist[req.params.id].ProductPrice;
                    wishlist[req.params.id].productTotal = plusPrice;
                }
            }


            res.redirect('/wishlist');
        });
    });


module.exports = router;