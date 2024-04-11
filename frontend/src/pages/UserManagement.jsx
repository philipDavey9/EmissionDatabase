import React from "react"
import {useState} from "react"
import {useEffect} from "react"
import axios from "axios"
import { Link } from "react-router-dom"


const UserManagement = () => {
    const [Users,setUsers]=useState([])

    useEffect(()=>{
        const FetchAllUsers = async ()=>{
            try{
                const res = await axios.get("http://localhost:3656/user")
                setUsers(res.data)
            }catch(err){
                console.log(err)
            }
        }
        FetchAllUsers()
    },[])

    const handleDelete = async (UserID)=>{
        try{
            await axios.delete("http://localhost:3656/user/"+UserID)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    return <div className ="Sections" >
        <div className="Users" >
        {Users.map(User=>(
            <div className="User" key= {Users.UserID}> 
            <h2>{User.Username}</h2>
            <h2>{User.Email}</h2>
            <h2>{User.UserType}</h2>
            <button className="delete" onClick ={()=>handleDelete(User.UserID)}>Delete</button>
            <button className="update"><Link to ={`EditEmission/${User.UserID}`} >Edit</Link></button>
            </div>
        )
)}
    </div><div className="row"> 
    <button className = "button"><Link to="/AddUser">Add New User</Link></button>
    <button className = "button"><Link to="/">Back</Link></button>
    </div>
    </div>
}
export default UserManagement;