const express = require('express');
var exphbs  = require('express-handlebars');
const app=express();
const path=require('path');
const request=require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT|| 5000


// API key  API Token: pk_edf9c45a75ee47508c5c15bbe63572e4 

//Calling the  API function
function call_api(finishedAPI, ticker)
{
    request('https://cloud.iexapis.com/stable/stock/'+ticker+'/quote?token=pk_edf9c45a75ee47508c5c15bbe63572e4',{json:true},(err,res,body)=>{
        if(err)
        {console.log(err);}
        
        if(res.statusCode===200){
            // console.log(body);
            finishedAPI(body)
        }
     });
}

//using body-parser middleware

app.use(bodyParser.urlencoded({extended:false}));


// Setting Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Setting Handlebars GET route
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home',{
            stock: doneAPI
        });
    });    
   
});

// Setting Handlebars POST route
app.post('/', function (req, res) {
    call_api(function(doneAPI){
        // posted_stuff=req.body.stock_ticker;
        res.render('home',{
            stock: doneAPI,
          
        });
    },req.body.stock_ticker);    
   
});


app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT,()=>console.log('Server Listeningon port'+PORT))