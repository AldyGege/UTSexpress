const express = require('express');
const router = express.Router();
//Import Express Validator
const {body, validationResult} = require('express-validator');
//Import Database
const connection = require('../config/database');

router.get('/', function (req, res){
    connection.query('SELECT pemesanan.id_pemesanan, pengguna.nama_pengguna, pemesanan.tanggal_pemesanan, pemesanan.total_harga FROM pemesanan JOIN pengguna ON pemesanan.id_pengguna = pengguna.id_pengguna', function(err, rows){
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
    body('tanggal_pemesanan').notEmpty(),
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
        tanggal_pemesanan: req.body.tanggal_pemesanan,
        total_harga: req.body.total_harga
    }
    connection.query('insert into pemesanan set ?', Data, function(err, rows){
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
    connection.query(`SELECT pemesanan.id_pemesanan, pengguna.nama_pengguna, pemesanan.tanggal_pemesanan, pemesanan.total_harga FROM pemesanan JOIN pengguna ON pemesanan.id_pengguna = pengguna.id_pengguna where id_pemesanan = ${id}`, function (err, rows) {
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
                message: 'Data Pemesanan',
                data: rows[0]
            })
        }
    })
});

router.patch('/update/:id', [
    body('id_pengguna').notEmpty(),
    body('tanggal_pemesanan').notEmpty(),
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
        tanggal_pemesanan: req.body.tanggal_pemesanan,
        total_harga: req.body.total_harga
    }
    connection.query(`update pemesanan set ? where id_pemesanan = ${id}`, Data, function (err, rows) {
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
    connection.query(`delete from pemesanan where id_pemesanan = ${id}`, function(err, rows) {
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
