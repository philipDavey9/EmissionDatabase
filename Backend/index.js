import express, { query } from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";


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
//Emissions Management
//Retreive Emissions data
app.get("/emissions_event",(req,res)=>{
    const q = "SELECT * FROM emissions_event"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//Send Emissions Data
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
//Delete Emissions Data
app.delete("/emissions_event/:EmissionsID", (req,res)=>{
    const Emissionid = req.params.EmissionsID;
    const q = "DELETE from emissions_event WHERE EmissionsID = ?";

    db.query(q,[Emissionid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Emissions event has been created")
    })

})
//Edit Emissions Data
app.put("/emissions_event/:EmissionsID", (req,res)=>{
    const Emissionid = req.params.EmissionsID;
    const q = "UPDATE emissions_event SET `Size`=?, `Date`=?, `Country Name`=?, `DeviceID`=?, `UserID`=?, `SourceID`=?, `Longitude`=?, `Latitude`=?  WHERE `EmissionsID`=?";
    const values = [
        req.body.Size,
        req.body.Date,
        req.body.Country_Name,
        req.body.DeviceID,
        req.body.UserID,
        req.body.SourceID,
        req.body.Longitude,
        req.body.Latitude,
    ]

    db.query(q,[...values, Emissionid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Emissions event has been updated")
    })

})
//User Management
//Retrieve User Info
app.get("/user",(req,res)=>{
    const q = "SELECT * FROM user"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//Add User
app.post("/user",(req,res)=>{
    const q = "INSERT INTO user (`UserID`, `Username`, `Password`, `Email`, `UserType`) VALUES (?)"
    const values = [
        req.body.UserID,
        req.body.Username,
        req.body.Password,
        req.body.Email,
        req.body.UserType,
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been created")
    })
})
//Delete User
app.delete("/user/:UserID", (req,res)=>{
    const Userid = req.params.UserID;
    const q = "DELETE from user WHERE UserID = ?";

    db.query(q,[Userid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been deleted")
    })

})

// Authenticate User (not currently implemented on frontend)
app.post("/user/authenticate", (req, res) => {
    const { Username, Password } = req.body;

    db.query("SELECT UserID, Password FROM User WHERE Username = ?", [Username], async (err, users) => {
        if (err) return res.status(500).json(err.message);
        if (users.length > 0) {
            const user = users[0];
            const validPassword = await bcrypt.compare(Password, user.Password);
            if (validPassword) {
                return res.json({ status: "Authentication successful", UserID: user.UserID });
            } else {
                return res.status(401).json("Authentication failed");
            }
        } else {
            return res.status(404).json("User not found");
        }
    });
});

// Edit User
app.put("/user/:UserID", (req,res)=>{
    const Userid = req.params.UserID;
    const q = "UPDATE user SET `Username`= ?, `Password`=?, `Email`=?, `UserType`=?  WHERE `UserID`=?";
    const values = [
        req.body.Username,
        req.body.Password,
        req.body.Email,
        req.body.UserType,
    ]
    db.query(q,[...values, Userid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("User has been updated")
    })

})

// System Administration
// Manage Gas Type
//Retreive Gas data
app.get("/gastype",(req,res)=>{
    const q = "SELECT * FROM gastype"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//Send gas type Data
app.post("/gastype",(req,res)=>{
    const q = "INSERT INTO gastype (`ChemicalFormula`, `GasName`, `GlobalWarmingPotential`) VALUES (?)"
    const values = [
        req.body.ChemicalFormula,
        req.body.GasName,
        req.body.GlobalWarmingPotential,
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("New Gas type has been created")
    })
})

// Edit Gas
app.put("/gastype/:ChemicalFormula", (req,res)=>{
    const Gasid = req.params.ChemicalFormula;
    const q = "UPDATE gastype SET `GasName`=?, `GlobalWarmingPotential`=?  WHERE `ChemicalFormula`=?";
    const values = [
        req.body.GasName,
        req.body.GlobalWarmingPotential,
    ]
    db.query(q,[...values, Gasid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Gas has been updated")
    })

})

//Delete Gas Data
app.delete("/gastype/:ChemicalFormula", (req,res)=>{
    const Gasid = req.params.ChemicalFormula;
    const q = "DELETE from gastype WHERE ChemicalFormula = ?";

    db.query(q,[Gasid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Gas data has been created")
    })

})

// Manage Devices
//Retreive Device data
app.get("/device",(req,res)=>{
    const q = "SELECT * FROM device"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//Send device Data
app.post("/device",(req,res)=>{
    const q = "INSERT INTO device (`DeviceID`,`Type`,`Manufacturer`,`DetectionThreshold`,`Resolution`) VALUES (?)"
    const values = [
        req.body.DeviceID,
        req.body.Type,
        req.body.Manufacturer,
        req.body.DetectionThreshold,
        req.body.Resolution,
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("New device has been created")
    })
})

// Edit Device
app.put("/device/:DeviceID", (req,res)=>{
    const Deviceid = req.params.DeviceID;
    const q = "UPDATE device SET `Type`= ?, `Manufacturer`=?, `DetectionThreshold`=?, `Resolution`=?  WHERE `DeviceID`=?";
    const values = [
        req.body.Type,
        req.body.Manufacturer,
        req.body.DetectionThreshold,
        req.body.Resolution,
    ]
    db.query(q,[...values, Deviceid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Device has been updated")
    })

})

//Delete Devie Data
app.delete("/device/:DeviceID", (req,res)=>{
    const Deviceid = req.params.DeviceID;
    const q = "DELETE from device WHERE DeviceID = ?";

    db.query(q,[Deviceid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Device has been created")
    })

})

// Manage Sites
// Add Site
app.post("/site/add", (req, res) => {
    const { SiteName, Latitude, Longitude, CountryOfOrigin } = req.body;
    db.query(
        "INSERT INTO Site (SiteName, Latitude, Longitude, CountryOfOrigin) VALUES (?, ?, ?, ?)",
        [SiteName, Latitude, Longitude, CountryOfOrigin],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Site added successfully");
        }
    );
});

// Edit Site
app.put("/site/edit", (req, res) => {
    const { SiteID, SiteName, Latitude, Longitude, CountryOfOrigin } = req.body;
    db.query(
        "UPDATE Site SET SiteName = ?, Latitude = ?, Longitude = ?, CountryOfOrigin = ? WHERE SiteID = ?",
        [SiteName, Latitude, Longitude, CountryOfOrigin, SiteID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Site updated successfully");
        }
    );
});

// Delete Site
app.delete("/site/delete", (req, res) => {
    const { SiteID } = req.body;
    db.query(
        "DELETE FROM Site WHERE SiteID = ?",
        [SiteID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Site deleted successfully");
        }
    );
});

// Manage Sources
//Retreive Source data
app.get("/source",(req,res)=>{
    const q = "SELECT * FROM source"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//Send gas type Data
app.post("/source",(req,res)=>{
    const q = "INSERT INTO source (`SourceID`,`SourceName`,`Subclass`) VALUES (?)"
    const values = [
        req.body.SourceID,
        req.body.SourceName,
        req.body.Subclass,
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("New source has been created")
    })
})

// Edit Source
app.put("/source/:SourceID", (req,res)=>{
    const Sourceid = req.params.SourceID;
    const q = "UPDATE source SET `SourceName`= ?, `Subclass`=? WHERE `SourceID`=?";
    const values = [
        req.body.SourceName,
        req.body.Subclass
    ]
    db.query(q,[...values, Sourceid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Source has been updated")
    })

})

//Delete Sources Data
app.delete("/source/:SourceID", (req,res)=>{
    const Sourceid = req.params.SourceID;
    const q = "DELETE from source WHERE SourceID = ?";

    db.query(q,[Sourceid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Source has been Deleted")
    })

})

// Reporting
// Generate Report
//not implemented or tested
app.get("/report/generate", (req, res) => {
    const { ReportType, StartDate, EndDate } = req.query;

    let query = "";
    if (ReportType === 'EmissionSummary') {
        query = `
            SELECT SUM(Size) AS TotalEmission, Type, CountryOfOrigin, Industry, DATE_FORMAT(Date, '%Y-%m') AS Month
            FROM EmissionEvent
            WHERE Date BETWEEN ? AND ?
            GROUP BY Type, CountryOfOrigin, Industry, Month;
        `;
    } else if (ReportType === 'IndustryEmission') {
        query = `
            SELECT Industry, SUM(Size) AS TotalEmission
            FROM EmissionEvent
            WHERE Date BETWEEN ? AND ?
            GROUP BY Industry;
        `;
    }

    if (query) {
        db.query(query, [StartDate, EndDate], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(result);
        });
    } else {
        res.status(400).json({ error: "Invalid Report Type" });
    }
});

// Export Report
app.get("/report/export", (req, res) => {
    const query = "SELECT Type, SUM(Size) AS TotalEmission FROM EmissionEvent GROUP BY Type";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Formatting results to CSV
        let csv = "Type,TotalEmission\n";
        results.forEach(row => {
            csv += `${row.Type},${row.TotalEmission}\n`;
        });

        // Setting up the headers to indicate a CSV file download
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=\"report.csv\"");

        // Sending the CSV data as the response
        res.send(csv);
    });
});


app.listen(3656,()=>{
    console.log("Connected to Backend!")

})
