var express = require('express');
var router = express.Router();
var db = require(db.js);
var bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/', function(req, res, next) {
    var SQL = "SELECT * FROM products WHERE active = 1";
    db.query(SQL, function(err, rows, fields) {
        if (err) {
            res.status(500).send({ error: 'Something failed' })
        }
        res.json(rows);
    })
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = "SELECT * FROM product WHERE id = ${id}";
    db.query(sql, function(err, rows, field) {
        if (err) {
            res.status(500).send({ error: 'something went wrong' })
        }
        res.json(rows);
    })
});

router.post('/create', function(req, res, next) {
    var name = req.body.name;
    var sku = req.body.sku;
    var price = req.body.price;
    var sql = 'INSERT INTO products(name, sku, price, active, created at) VALUES("${name}", "${sku}", "${price}", "1", NOW())';

    db.query(sql, function(err, rows, field) {
        if (err) {
            res.status(500).send({ error: 'something failed' })
        }
        res.json({ status: 'success' })
    })
});

router.put('/update/:id', function(req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var sku = req.body.sku;
    var price = req.body.price;
    var sql = 'UPDATE products SET name = "${name}", sku = "${sku}", price = "${price}" WHERE id = "${id}"';

    db.query(sql, function(err, rows, field) {
        if (err) {
            res.status(500).send({ error: 'something failed' })
        }
        res.json({ status: 'success' })
    })
});

router.delete('/delete/:id', function(req, res, next) {
    var id = req.params.id;
    var sql = 'DELETE FROM products WHERE id = ${id}';
    db.query(sql, function(err, result) {
        if (err) {
            res.status(500).send({ error: 'something failed' });
        }
        res.json({ status: "success" })
    })
});
module.exports = router;