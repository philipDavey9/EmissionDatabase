import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"


const EditDevice = () => {
   
    const[Device,setDevice] = useState({
        DeviceID:null,
        Type:"",
        Manufacturer:"",
        DetectionThreshold:null,
        Resolution:null,
    });
    const navigate = useNavigate()
    const location = useLocation()
    const ID = location.pathname.split("/")[4]

    const handleDevice = (e) => {
        setDevice((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:3656/device/"+ID,Device)
            navigate("/SystemAdmin/Device")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Update Device</h1>
        <input type="text" placeholder="Type" onChange = {handleDevice} name = "Type"/>
        <input type="text" placeholder="Manufacturer" onChange = {handleDevice} name = "Manufacturer"/>
        <input type="number" placeholder="Detection Threshold" onChange = {handleDevice} name = "DetectionThreshold"/>
        <input type="number" placeholder="Resolution" onChange = {handleDevice} name = "Resolution"/>
        <button onClick={handleClick}>Update</button>
        <button className = "button"><Link to="/SystemAdmin/Device">Back</Link></button>
    </div>
}
export default EditDevice;