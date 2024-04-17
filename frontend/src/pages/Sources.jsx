import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"


const Sources = () => {
    const [Sources,setSources]=useState([])

    useEffect(()=>{
        const FetchAllSources = async ()=>{
            try{
                const res = await axios.get("http://localhost:3656/source")
                setSources(res.data)
            }catch(err){
                console.log(err)
            }
        }
        FetchAllSources()
    },[])

    const handleDelete = async (SourceID)=>{
        try{
            await axios.delete("http://localhost:3656/source/"+SourceID)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return <div className ="Sections" >
        <div className="Emissions" >
        {Sources.map(Source=>(
            <div className="Emission" key= {Source.SourceID}> 
            <h2>{Source.SourceName}</h2>
            <h2>{Source.Subclass}</h2>
            <button className="delete" onClick ={()=>handleDelete(Source.SourceID)}>Delete</button>
            <button className="update"><Link to ={`EditSource/${Source.SourceID}`} >Edit</Link></button>
            </div>
        )
)}
    </div><div className="row"> 
    <button className = "button"><Link to="/SystemAdmin/Sources/AddSource">Add Source</Link></button>
    <button className = "button"><Link to="/SystemAdmin">Back</Link></button>
    </div></div>
}
export default Sources