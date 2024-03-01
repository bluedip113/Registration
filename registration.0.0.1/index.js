


var express=require("express");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

var app=express()
app.use('/images',express.static('images'));

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))


app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

app.post("/sign_up",(req,res) => {
    var name= req.body.name;
    var lname=req.body.lname;
    var email=req.body.email;
    var gender=req.body.gender;
    var password=req.body.password;
    var cpassword=req.body.cpassword;

    var data={
        "name":name,
        "lname":lname,
        "email":email,
        "gender":gender,
        "password":password,
        "cpassword":cpassword
    }

    db.collection('users').insertOne(data,(err,collection) => {
        if(err)
            throw err;
        
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})


app.listen(3000);

console.log("Listening on port 3000");