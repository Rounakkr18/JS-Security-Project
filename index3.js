const express=require("express");
const app=express();
app.use(express.json());  //to read json body

// in memory array, act like db
let students=[
    {id:1, name:"Ali", phone:9898989898, address:"Bbsr", age:25},
    {id:2, name:"Rounak", phone:9897346898, address:"Rnc", age:35}
];

// POST /users
app.post("/students", (req, res)=>{
    const newStud={
        id: students.length+1,
        name:req.body.name,
        phone:req.body.phone,
        address:req.body.address,
        age:req.body.age
    };

    students.push(newStud);
    res.send(newStud);
});

app.get("/students/:id", (req, res)=>{
    const student=students.find(u=>u.id==req.params.id);
    if(!student) return res.status(404).send("User not found");
    res.send(student);
});
// GET /users/:id
app.get("/students", (req, res)=>{
   
    res.send(students);
});

// UPDATE
//PUT /users/:id
app.put("/students/:id", (req,res)=>{
    const student=students.find(u=>u.id==req.params.id);
    if(!student) return res.status(404).send("User not found");

    student.name=req.body.name;
    student.phone=req.body.phone;
    student.address=req.body.address;
    student.age=req.body.age;
    res.send(student);
});

// DELETE /users/:id
app.delete("/students/:id", (req,res)=>{
    students=students.filter(u=>u.id!=req.params.id);
    res.send("student deleted");
});

app.listen(4000, ()=>{
    console.log("server running on port 3000");
    
});
