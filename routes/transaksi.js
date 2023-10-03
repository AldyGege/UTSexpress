const express = require('express');
const router = express.Router();
//Import Express Validator
const {body, validationResult} = require('express-validator');
//Import Database
const connection = require('../config/database');

router.get('/', function (req, res){
    connection.query('SELECT transaksi.id_transaksi, pengguna.nama_pengguna,transaksi.tanggal_transaksi, transaksi.total_harga FROM transaksi JOIN pengguna ON transaksi.id_pengguna = pengguna.id_pengguna', function(err, rows){
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
    body('id_pengguna').notEmpty(),
    body('tanggal_transaksi').notEmpty(),
    body('total_harga').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        id_pengguna: req.body.id_pengguna,
        tanggal_transaksi: req.body.tanggal_transaksi,
        total_harga: req.body.total_harga
    }
    connection.query('insert into transaksi set ?', Data, function(err, rows){
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
    connection.query(`SELECT transaksi.id_transaksi, pengguna.nama_pengguna,transaksi.tanggal_transaksi, transaksi.total_harga FROM transaksi JOIN pengguna ON transaksi.id_pengguna = pengguna.id_pengguna where id_transaksi = ${id}`, function (err, rows) {
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
                message: 'Data Transaksi',
                data: rows[0]
            })
        }
    })
});

router.patch('/update/:id', [
    body('id_pengguna').notEmpty(),
    body('tanggal_transaksi').notEmpty(),
    body('total_harga').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id;
    let Data = {
        id_pengguna: req.body.id_pengguna,
        tanggal_transaksi: req.body.tanggal_transaksi,
        total_harga: req.body.total_harga
    }
    connection.query(`update transaksi set ? where id_transaksi = ${id}`, Data, function (err, rows) {
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
    connection.query(`delete from transaksi where id_transaksi = ${id}`, function(err, rows) {
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
