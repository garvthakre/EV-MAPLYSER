import pool from "../config/db.js";

export async function CreateStations(req,res) {
     try {
        const { name, location, latitude, longitude, installed_on, capacity_kw  } = req.body;
        const create = await pool.query(
            "INSERT INTO stations  (name, location, latitude, longitude, installed_on, capacity_kw, owner_id) VALUES($1,$2,$3,$4,$5,$6,$7) returning *",[name, location, latitude, longitude, installed_on, capacity_kw,req.user_id]
             
        )
        res.status(201).json(create.rows);
     } catch (error) {
        console.error(error);
        res.status(404).json("err message",error.message);
     }
    
}
export async function GetStations(req,res){
    try {
        const resu = await pool.query(
            "SELECT * FROM stations ORDER BY id"
        )
        res.status(201).json(resu);
    } catch (error) {
     console.error(error);
        res.status(404).json("err message",error.message);   
    }
}

export async function GetStationsById(req,res){
    try {
        const {id}= req.params;

        const resu = await pool.query(
            "SELECT * FROM stations WHERE id = $1",[id]
        )
        if(resu.rows.length==0) res.send("NO STATIONS FOUND");
        res.status(201).json(resu);
    } catch (error) {
     console.error(error);
        res.status(404).json("err message",error.message);   
    }
}
