import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"


const Emissions = () => {
    const [Emissions,setEmissions]=useState([])

    useEffect(()=>{
        const FetchAllEmissions = async ()=>{
            try{
                const res = await axios.get("http://localhost:3656/emissions_event")
                setEmissions(res.data)
            }catch(err){
                console.log(err)
            }
        }
        FetchAllEmissions()
    },[])

    const handleDelete = async (EmissionsID)=>{
        try{
            await axios.delete("http://localhost:3656/emissions_event/"+EmissionsID)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return <div className ="Sections" >
        <div className="Emissions" >
        {Emissions.map(Emission=>(
            <div className="Emission" key= {Emission.EmissionsID}> 
            <h2>{Emission.Size}</h2>
            <h2>{Emission.Date}</h2>
            <h2>{Emission.Country_Name}</h2>
            <h2>{Emission.DeviceID}</h2>
            <h2>{Emission.UserID}</h2>
            <h2>{Emission.SourceID}</h2>
            <h2>{Emission.Longitude}</h2>
            <h2>{Emission.Latitude}</h2>
            <button className="delete" onClick ={()=>handleDelete(Emission.EmissionsID)}>Delete</button>
            <button className="update"><Link to ={`EditEmission/${Emission.EmissionsID}`} >Edit</Link></button>
            </div>
        )
)}
    </div><div className="row"> 
    <button className = "button"><Link to="/AddEmissions">Add Emission</Link></button>
    <button className = "button"><Link to="/SearchEmissions">Search Emissions</Link></button>
    <button className = "button"><Link to="/">Back</Link></button>
    </div></div>
}
export default Emissions