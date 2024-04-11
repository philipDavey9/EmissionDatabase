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
app.get("/emissions_event",(req,res)=>{
    const q = "SELECT * FROM emissions_event"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

// User Management
// Add User
app.post("/user/add", async (req, res) => {
    const { Username, Password, Email, UserType } = req.body;
    const hashedPassword = await bcrypt.hash(Password, 10);

    db.query(
        "INSERT INTO User (Username, Password, Email, UserType) VALUES (?, ?, ?, ?)",
        [Username, hashedPassword, Email, UserType],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            return res.json("User registration successful");
        }
    );
});

// Authenticate User
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
app.put("/user/edit", (req, res) => {
    const { UserID, Username, Email, UserType } = req.body;

    db.query(
        "UPDATE User SET Username = ?, Email = ?, UserType = ? WHERE UserID = ?",
        [Username, Email, UserType, UserID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            return res.json("User update successful");
        }
    );
});

// Delete User
app.delete("/user/delete", (req, res) => {
    const { UserID } = req.body;

    db.query("DELETE FROM User WHERE UserID = ?", [UserID], (err, result) => {
        if (err) return res.status(500).json(err.message);
        return res.json("User deletion successful");
    });
});

// System Administration
// Manage Gas Type
// Add Gas Type
app.post("/gasType/add", (req, res) => {
    const { ChemicalFormula, GasName, GlobalWarmingPotential } = req.body;
    db.query(
        "INSERT INTO GasType (ChemicalFormula, GasName, GlobalWarmingPotential) VALUES (?, ?, ?)",
        [ChemicalFormula, GasName, GlobalWarmingPotential],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Gas type added successfully");
        }
    );
});

// Edit Gas Type
app.put("/gasType/edit", (req, res) => {
    const { ChemicalFormula, GasName, GlobalWarmingPotential } = req.body;
    db.query(
        "UPDATE GasType SET GasName = ?, GlobalWarmingPotential = ? WHERE ChemicalFormula = ?",
        [GasName, GlobalWarmingPotential, ChemicalFormula],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Gas type updated successfully");
        }
    );
});

// Delete Gas Type
app.delete("/gasType/delete", (req, res) => {
    const { ChemicalFormula } = req.body;
    db.query(
        "DELETE FROM GasType WHERE ChemicalFormula = ?",
        [ChemicalFormula],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Gas type deleted successfully");
        }
    );
});

// Manage Devices
// Add Device
app.post("/device/add", (req, res) => {
    const { Type, Manufacturer, DetectionThreshold, Resolution } = req.body;
    db.query(
        "INSERT INTO Device (Type, Manufacturer, DetectionThreshold, Resolution) VALUES (?, ?, ?, ?)",
        [Type, Manufacturer, DetectionThreshold, Resolution],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Device added successfully");
        }
    );
});

// Edit Device
app.put("/device/edit", (req, res) => {
    const { DeviceID, Type, Manufacturer, DetectionThreshold, Resolution } = req.body;
    db.query(
        "UPDATE Device SET Type = ?, Manufacturer = ?, DetectionThreshold = ?, Resolution = ? WHERE DeviceID = ?",
        [Type, Manufacturer, DetectionThreshold, Resolution, DeviceID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Device updated successfully");
        }
    );
});

// Delete Device
app.delete("/device/delete", (req, res) => {
    const { DeviceID } = req.body;
    db.query(
        "DELETE FROM Device WHERE DeviceID = ?",
        [DeviceID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Device deleted successfully");
        }
    );
});

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
// Add Source
app.post("/source/add", (req, res) => {
    const { SourceName, Subclass } = req.body;
    db.query(
        "INSERT INTO Source (SourceName, Subclass) VALUES (?, ?)",
        [SourceName, Subclass],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Source added successfully");
        }
    );
});

// Edit Source
app.put("/source/edit", (req, res) => {
    const { SourceID, SourceName, Subclass } = req.body;
    db.query(
        "UPDATE Source SET SourceName = ?, Subclass = ? WHERE SourceID = ?",
        [SourceName, Subclass, SourceID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Source updated successfully");
        }
    );
});

// Delete Source
app.delete("/source/delete", (req, res) => {
    const { SourceID } = req.body;
    db.query(
        "DELETE FROM Source WHERE SourceID = ?",
        [SourceID],
        (err, result) => {
            if (err) return res.status(500).json(err.message);
            res.json("Source deleted successfully");
        }
    );
});

// Reporting
// Generate Report
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

app.delete("/emissions_event/:EmissionsID", (req,res)=>{
    const Emissionid = req.params.EmissionsID;
    const q = "DELETE from emissions_event WHERE EmissionsID = ?";

    db.query(q,[Emissionid], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Emissions event has been created")
    })

})
app.listen(3656,()=>{
    console.log("Connected to Backend!")

})
