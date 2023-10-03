const express = require('express')
const app = express()
const port = 3000

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({extended: false}));
app.use(bodyPs.json());

const PenggunaRouter = require('./routes/pengguna.js');
app.use('/api/pengguna', PenggunaRouter);

const ProdukRouter = require('./routes/produk.js');
app.use('/api/produk', ProdukRouter);

const TransaksiRouter = require('./routes/transaksi.js');
app.use('/api/transaksi', TransaksiRouter);

const KategoriRouter = require('./routes/kategori_produk.js');
app.use('/api/kategori', KategoriRouter);

const UlasanRouter = require('./routes/ulasan.js');
app.use('/api/ulasan', UlasanRouter);

const KaryawanRouter = require('./routes/karyawan.js');
app.use('/api/karyawan', KaryawanRouter);

const PemesananRouter = require('./routes/pemesanan.js');
app.use('/api/pemesanan', PemesananRouter);

app.listen(port, () => {
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})