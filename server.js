//Express JS
const express = require('express');
const fs=require('fs');
const bodyParser=require('body-parser');
const cors=require('cors');
const async = require('async');
const app=express();
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCAOHpGqvNo0M1eRd58Hb2GGJLifR60a3A'
});

//Config Vars
const PORT = process.env.PORT;


//CORS
var corsOptions={
/*
      origin: 'localhost:4200',
      methods: ['GET','POST','PUT'],
      allowedHeaders: ['Origin','X-Requested-With','contentType','Content-Type','Accept','Authorization'],
      credentials: true,
      optionsSuccessStatus: 200
*/
};

app.use(cors(corsOptions));

//Setup Server on Port
app.listen(PORT || 8000,()=>{
    console.log("Server started listening");
});

app.use(bodyParser.json());

app.route('/api/getPlaceFromText/:text').get((req,res)=>{
    let text=req.params['text'];
    var arrTxt = text.split("-");
    var url=arrTxt.join(' ');
    googleMapsClient.geocode({
        address: text
      }, function(err, response) {
        if (!err) {
            res.send({status:200, response: response.json.results});
        }
      });
})