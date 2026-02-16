// var express=require("express")
// var app=express();
// app.get("/",function(req,res){
//     res.send("Welcome to the Rest API")
// });
// app.listen(9000,()=>console.log("API Started Listening"))



// var express=require("express")
// var app=express();
// app.get("/",function(req,res){
//     res.send("Hello from API")
// });
// app.get('/time',function(req,res){                    // time -> endpoint
//     var time=new Date().toLocaleTimeString();
//     res.send(`Time is: ${time}`);
// });
// app.get('/date',function(req,res){                    // date -> endpoint
//     var date=new Date().toLocaleDateString(); 
//     res.send(`Date is: ${date}`);
// });
// app.listen(9000,()=>console.log("API Started Listening..."))


var express=require("express")
var app=express();
app.get("/",function(req,res){
    res.send("Hello from API")
});
app.get('/square/:n',function(req,res){                  
    var n=req.params.n;
    res.send(`Square ${n} is: ${n*n}`)
});
app.get('/addition/:a/:b',function(req,res){                  
    var a=Number(req.params.a);
    var b=Number(req.params.b);
    var c=a+b;
    res.send(`Add of ${a} and ${b} is: ${c}`);
}); 
    
app.listen(9000,()=>console.log("API Started Listening..."))