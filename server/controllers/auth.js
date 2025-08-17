import bcrypt from 'bcryptjs';
import Pool from '../config/db.js';
import jwt from "jsonwebtoken";
export  default   async function  signup  (req,res){
    try{
     const{name,email,password,role} = req.body;
     if(!name || !email || !password) return res.status(404).json("ALL FIELDS AEE REQUIRED");
    const checkuser = await Pool.query(
        'SELECT 1 FROM users WHERE email = $1 limit 1',[email]
    );
    if(checkuser.rows.length>0) return res.send("USER ALREADY REGISTERED");
    const hashedpass = await  bcrypt.hash(password,10);
    const newuser =  await Pool.query(
        'INSERT INTO  users (name,email,password,role) values($1,$2,$3,$4) returning name,email,password,role',[
            name,email,hashedpass,role]);
            res.status(201).json("USER IS SUCCESSFULLY CREATED",newuser);

       
    }catch(err){
        console.error(err);
        res.status(500).json("error",err.message);
    }
}

export  async function login(req,res){
    try {
         const {email,password}= req.body;
         const login = await Pool.query(
            'SELECT * FROM users WHERE email = $1',[
                email]);
                if(login.rows.length==0) return res.status(400).json("NO USER IS FOUND");
                const validpass = await bcrypt.compare(password,login.rows[0].password);
                if(!validpass) return res.status(400).json("PASSWORD IS WRONG");
                 const token = jwt.sign({ id: login.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({token});
            console.log("")
    } catch (err) {
        console.error(err);
        res.status(500).json("error",err.message);
    }
    
}