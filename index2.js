const express=require("express");
const app=express();
app.use(express.json());  //to read json body

// in memory array, act like db
let users=[
    {id:1, name:"Ali", age:25},
    {id:2, name:"Sara", age:30}
];

// POST /users
app.post("/users", (req, res)=>{
    const newUser={
        id: users.length+1,
        name:req.body.name,
        age:req.body.age
    };

    users.push(newUser);
    res.send(newUser);
});

app.get("/users/:id", (req, res)=>{
    const user=users.find(u=>u.id==req.params.id);
    if(!user) return res.status(404).send("User not found");
    res.send(user);
});
// GET /users/:id
app.get("/users", (req, res)=>{
   
    res.send(users);
});

// UPDATE
//PUT /users/:id
app.put("/users/:id", (req,res)=>{
    const user=users.find(u=>u.id==req.params.id);
    if(!user) return res.status(404).send("User not found");

    user.name=req.body.name;
    user.age=req.body.age;
    res.send(user);
});

// DELETE /users/:id
app.delete("/users/:id", (req,res)=>{
    users=users.filter(u=>u.id!=req.params.id);
    res.send("users deleted");
});

app.listen(3000, ()=>{
    console.log("server running on port 3000");
    
});
