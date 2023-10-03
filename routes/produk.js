const express = require('express');
const router = express.Router();
//Import Express Validator
const {body, validationResult} = require('express-validator');
//Import Database
const connection = require('../config/database');

router.get('/', function (req, res){
    connection.query('select * from produk order by id_produk desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            })
        }else{
            return res.status(200).json({
                status:true,
                message: 'Data Produk',
                data: rows
            })
        }
    })
});

router.post('/store', [
    body('nama_produk').notEmpty(),
    body('harga').notEmpty(),
    body('stok').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        stok: req.body.stok
    }
    connection.query('insert into produk set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Success..!',
                data: rows[0]
            })
        }
    })
});

router.get('/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query(`select * from produk where id_produk = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                status: false,
                message: 'Not Found'
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data Produk',
                data: rows[0]
            })
        }
    })
});

router.patch('/update/:id', [
    body('nama_produk').notEmpty(),
    body('harga').notEmpty(),
    body('stok').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id;
    let Data = {
        nama_produk: req.body.nama_produk,
        harga: req.body.harga,
        stok: req.body.stok
    }
    connection.query(`update produk set ? where id_produk = ${id}`, Data, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(500).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
});

router.delete('/delete/(:id)', function(req, res) {
    let id = req.params.id;
    connection.query(`delete from produk where id_produk = ${id}`, function(err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error'
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data has been Delete!'
            })
        }
    })
});
module.exports = router;
