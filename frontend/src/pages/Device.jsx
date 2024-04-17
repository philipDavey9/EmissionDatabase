import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"


const Devices = () => {
    const [Devices,setDevices]=useState([])

    useEffect(()=>{
        const FetchAllDevices = async ()=>{
            try{
                const res = await axios.get("http://localhost:3656/device")
                setDevices(res.data)
            }catch(err){
                console.log(err)
            }
        }
        FetchAllDevices()
    },[])

    const handleDelete = async (DeviceID)=>{
        try{
            await axios.delete("http://localhost:3656/device/"+DeviceID)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return <div className ="Sections" >
        <div className="Emissions" >
        {Devices.map(Device=>(
            <div className="Emission" key= {Device.DeviceID}> 
            <h2>{Device.Type}</h2>
            <h2>{Device.Manufacturer}</h2>
            <h2>{Device.DetectionThreshold}</h2>
            <h2>{Device.Resolution}</h2>
            <button className="delete" onClick ={()=>handleDelete(Device.DeviceID)}>Delete</button>
            <button className="update"><Link to ={`EditDevice/${Device.DeviceID}`} >Edit</Link></button>
            </div>
        )
)}
    </div><div className="row"> 
    <button className = "button"><Link to="/SystemAdmin/Device/AddDevice">Add Device</Link></button>
    <button className = "button"><Link to="/SystemAdmin">Back</Link></button>
    </div></div>
}
export default Devices