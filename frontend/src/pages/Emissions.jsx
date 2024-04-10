import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from "axios"


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
    return (<div>
         <h1>Emissions Log</h1>
         <div className="Emissions">
            {Emissions.map(Emission=>(
                <div className="Emission">{Emission.Size}<div/>
            ))}
         <div/>
    <div/>
)
export default Emissions