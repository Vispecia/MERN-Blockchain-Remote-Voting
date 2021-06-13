const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const {createProxyMiddleware} = require('http-proxy-middleware');
const {MONGOURI} = require('./config/keys');
const PORT = process.env.PORT || 5000 ;

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to DB');
});
mongoose.connection.on('error',()=>{
    console.log('error connected to DB');
});

require('./models/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('./routes/auth'));


if(process.env.NODE_ENV=="production")
{
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log('server is running');
})