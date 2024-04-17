import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"


const Gases = () => {
    const [Gases,setGases]=useState([])

    useEffect(()=>{
        const FetchAllGases = async ()=>{
            try{
                const res = await axios.get("http://localhost:3656/gastype")
                setGases(res.data)
            }catch(err){
                console.log(err)
            }
        }
        FetchAllGases()
    },[])

    const handleDelete = async (ChemicalFormula)=>{
        try{
            await axios.delete("http://localhost:3656/gastype/"+ChemicalFormula)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return <div className ="Sections" >
        <div className="Emissions" >
        {Gases.map(Gas=>(
            <div className="Emission" key= {Gas.ChemicalFormula}> 
            <h2>{Gas.ChemicalFormula}</h2>
            <h2>{Gas.GasName}</h2>
            <h2>{Gas.GlobalWarmingPotential}</h2>
            <button className="delete" onClick ={()=>handleDelete(Gas.ChemicalFormula)}>Delete</button>
            <button className="update"><Link to ={`/SystemAdmin/Gases/EditGas/${Gas.ChemicalFormula}`} >Edit</Link></button>
            </div>
        )
)}
    </div><div className="row"> 
    <button className = "button"><Link to="/SystemAdmin/Gases/AddGas">Add Gas</Link></button>
    <button className = "button"><Link to="/SystemAdmin">Back</Link></button>
    </div></div>
}
export default Gases