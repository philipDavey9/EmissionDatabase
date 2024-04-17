import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"


const EditSource = () => {
   
    const[Source,setSource] = useState({
        SourceID:null,
        SourceName:"",
        Subclass:null,
    });
    const navigate = useNavigate()
    const location = useLocation()
    const ID = location.pathname.split("/")[4]

    const handleSource = (e) => {
        setSource((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:3656/source/"+ID,Source)
            navigate("/SystemAdmin/Sources")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Update Source</h1>
        <input type="text" placeholder="Source Name" onChange = {handleSource} name = "SourceName"/>
        <input type="number" placeholder="Subclass" onChange = {handleSource} name = "Subclass"/>
        <button onClick={handleClick}>Update</button>
        <button className = "button"><Link to="/SystemAdmin/Sources">Back</Link></button>
    </div>
}
export default EditSource;