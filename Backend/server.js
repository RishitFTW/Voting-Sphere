const express= require('express');
const app= express();
const db= require('./db')
require('dotenv').config();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
const PORT= process.env.PORT || 3000
const cors= require('cors')
app.use(cors());


const userRoutes= require('./routes/user');
const candidateRoutes= require('./routes/candidate');


app.use('/user', userRoutes);
app.use('/candidate',candidateRoutes);



app.listen(PORT,()=>{
    console.log("server is up "+PORT);
})