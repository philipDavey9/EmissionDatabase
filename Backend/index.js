import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"cpsc-471-database"
})

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello from backend")
})
app.get("/emissions_event",(req,res)=>{
    const q = "SELECT * FROM emissions_event"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/emissions_event",(req,res)=>{
    const q = "INSERT INTO emissions_event (`EmissionsID`,`Size`,`Date`,`Country Name`,`DeviceID`, `UserID`,`SourceID`,`Longitude`,`Latitude`) VALUES (?)"
    const values = [
        req.body.EmissionsID,
        req.body.Size,
        req.body.Date,
        req.body.Country_Name,
        req.body.DeviceID,
        req.body.UserID,
        req.body.SourceID,
        req.body.Longitude,
        req.body.Latitude,

    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Emissions event has been created")
    })
})

app.listen(3656,()=>{
    console.log("Connected to Backend!")

})