import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"


const EditGas = () => {
   
    const[Gas,setGas] = useState({
        ChemicalFormula:"",
        GasName:"",
        GlobalWarmingPotential:null,
    });
    const navigate = useNavigate()
    const location = useLocation()
    const ID = location.pathname.split("/")[4]

    const handleGas = (e) => {
        setGas((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:3656/gastype/"+ID,Gas)
            navigate("/SystemAdmin/Gases")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Update Gas</h1>
        <input type="text" placeholder="Gas Name" onChange = {handleGas} name = "GasName"/>
        <input type="number" placeholder="Global Warming Potential" onChange = {handleGas} name = "GlobalWarmingPotential"/>
        <button onClick={handleClick}>Update</button>
        <button className = "button"><Link to="/SystemAdmin/Gases">Back</Link></button>
    </div>
}
export default EditGas;