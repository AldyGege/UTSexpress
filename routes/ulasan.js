const express = require('express');
const router = express.Router();
//Import Express Validator
const {body, validationResult} = require('express-validator');
//Import Database
const connection = require('../config/database');

router.get('/', function (req, res){
    connection.query('SELECT ulasan.id_ulasan, produk.nama_produk, pengguna.nama_pengguna,ulasan.komentar,ulasan.tanggal_ulasan FROM ulasan JOIN produk ON ulasan.id_produk = produk.id_produk JOIN pengguna ON ulasan.id_pengguna = pengguna.id_pengguna', function(err, rows){
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
    body('id_produk').notEmpty(),
    body('id_pengguna').notEmpty(),
    body('komentar').notEmpty(),
    body('tanggal_ulasan').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let Data = {
        id_produk: req.body.id_produk,
        id_pengguna: req.body.id_pengguna,
        komentar: req.body.komentar,
        tanggal_ulasan: req.body.tanggal_ulasan
    }
    connection.query('insert into ulasan set ?', Data, function(err, rows){
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
    connection.query(`SELECT ulasan.id_ulasan, produk.nama_produk, pengguna.nama_pengguna,ulasan.komentar,ulasan.tanggal_ulasan FROM ulasan JOIN produk ON ulasan.id_produk = produk.id_produk JOIN pengguna ON ulasan.id_pengguna = pengguna.id_pengguna where id_ulasan = ${id}`, function (err, rows) {
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
                message: 'Data Ulasan',
                data: rows[0]
            })
        }
    })
});

router.patch('/update/:id', [
    body('id_produk').notEmpty(),
    body('id_pengguna').notEmpty(),
    body('komentar').notEmpty(),
    body('tanggal_ulasan').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        })
    }
    let id = req.params.id;
    let Data = {
        id_produk: req.body.id_produk,
        id_pengguna: req.body.id_pengguna,
        komentar: req.body.komentar,
        tanggal_ulasan: req.body.tanggal_ulasan
    }
    connection.query(`update ulasan set ? where id_ulasan = ${id}`, Data, function (err, rows) {
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
    connection.query(`delete from ulasan where id_ulasan = ${id}`, function(err, rows) {
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
