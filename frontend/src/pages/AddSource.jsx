import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const AddSource = () => {
   
    const[Source,setSource] = useState({
        "SoruceID":null,
        "SourceName":"",
        "Subclass":null,
    });
    const navigate = useNavigate()

    const handleSource = (e) => {
        setSource((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3656/source",Source)
            navigate("/SystemAdmin/Sources")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Add new Source</h1>
        <input type="text" placeholder = "Source Name" onChange = {handleSource} name = "SourceName"/>
        <input type="number" placeholder = "Subclass" onChange = {handleSource} name = "Subclass"/>
        <button onClick={handleClick}>Add</button>
    </div>
};
export default AddSource;