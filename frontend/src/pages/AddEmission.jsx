import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const AddEmissions = () => {
   
    const[Emission,setEmission] = useState({
        Size: null,
        Date:null,
        Country_Name:"",
        DeviceID:null,
        UserID:null,
        SourceID:null,
        Longitude:null,
        Latitude:null
    });
    const navigate = useNavigate()

    const handleEmission = (e) => {
        setEmission((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3656/emissions_event",Emission)
            navigate("/Emissions")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Add new Emission</h1>
        <input type="number" placeholder = "Size"      onChange = {handleEmission} name ="Size"/>
        <input type="date" placeholder = "Date"        onChange = {handleEmission} name ="Date"/>
        <input type="text" placeholder = "Country"     onChange = {handleEmission} name ="Country_Name"/>
        <input type="number" placeholder = "DeviceID"  onChange = {handleEmission} name ="DeviceID"/>
        <input type="number" placeholder = "UserID"    onChange = {handleEmission} name ="UserID"/>
        <input type="number" placeholder = "SourceID"  onChange = {handleEmission} name ="SourceID"/>
        <input type="number" placeholder = "Longitude" onChange = {handleEmission} name ="Longitude"/>
        <input type="number" placeholder = "Latitude"  onChange = {handleEmission} name ="Latitude"/>
        <button onClick={handleClick}>Add</button>
    </div>
};
export default AddEmissions;