const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/routes')

const app = express();
const port = process.env.PORT || 3000;

// Usamos cors
app.use(cors());
app.use(express.json());

// /Definismos previaruta
app.use('/api/v1', routes)

// definimos el puerto
app.listen(port,()=>{
    console.log('Papu, estamos activos en el puerto' + " " +port)
});
