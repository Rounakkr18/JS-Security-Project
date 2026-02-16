const express = require('express');
const bodyParser=require('body-parser');
const jwt=require('jsonwebtoken');

const app = express();

app.use(bodyParser.json());

const PORT=3000;
const SECRET_KEY="mysecret123";

// fake user (no DB)
const users=[
    {id:1, username:"admin", password:"1234"},
    {id:2, username:"user", password:"abcd"}
];

// LOGIN
app.post("/login",(req,res)=>{
    const {username, password}=req.body;
    const user=users.find(
        u=>u.username===username && u.password===password
    );
    if(!user){
        return res.status(401).json({ message:"Inalid credentials" });
    }

    const token=jwt.sign(
        {
            id:user.id, username:user.username
        },SECRET_KEY,{ expiresIn:"1h" }
    );
    res.json({ token });
});

//JWT Middleware
function verifyToken(req,res,next){
    const header=req.headers['authorization'];  

    if(!header)
        return res.status(401).json({ message:"Token missing" });

    const token=header.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        if(err) return res.status(401).json({ message:"Invalid token" });

        req.user=decoded;
        next();
    });
}

// Protected route
app.get("/dashboard", verifyToken, (req,res)=>{
    res.json({
        message: "Welcome Dashboard",
        user:req.user
    });
});

//start server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});