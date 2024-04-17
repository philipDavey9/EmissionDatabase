import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const AddGas = () => {
   
    const[Gas,setGas] = useState({
        ChemicalFormula:"",
        GasName:"",
        GlobalWarmingPotential:null,
    });
    const navigate = useNavigate()

    const handleGas = (e) => {
        setGas((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3656/gastype",Gas)
            navigate("/SystemAdmin/Gases")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Add new Gas</h1>
        <input type="text" placeholder = "Chemical Formula" onChange = {handleGas} name = "ChemicalFormula"/>
        <input type="text" placeholder = "Gas Name" onChange = {handleGas} name = "GasName"/>
        <input type="number" placeholder = "Global Warming Potential" onChange = {handleGas} name = "GlobalWarmingPotential"/>
        <button onClick={handleClick}>Add</button>
    </div>
};
export default AddGas;