import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const AddDevice = () => {
   
    const[Device,setDevice] = useState({
        DeviceID:null,
        Type:"",
        Manufacturer:"",
        DetectionThreshold:null,
        Resolution:null,
    });
    const navigate = useNavigate()

    const handleDevice = (e) => {
        setDevice((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3656/device",Device)
            navigate("/SystemAdmin/Device")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Add new Device</h1>
        <input type="text" placeholder = "Type" onChange = {handleDevice} name = "Type"/>
        <input type="text" placeholder = "Manufacturer" onChange = {handleDevice} name = "Manufacturer"/>
        <input type="number" placeholder = "Detection Threshold" onChange = {handleDevice} name = "DetectionThreshold"/>
        <input type="number" placeholder = "Resolution" onChange = {handleDevice} name = "Resolution"/>
        <button onClick={handleClick}>Add</button>
    </div>
};
export default AddDevice;