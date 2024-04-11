import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"


const AddUser = () => {
   
    const[User,setUser] = useState({
        Username:"",
        Password:"",
        Email:"",
        UserType:"",
    });
    const navigate = useNavigate()

    const handleUser = (e) => {
        setUser((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:3656/user",User)
            navigate("/UserManagement")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Add new User</h1>
        <input type="text" placeholder="Username" onChange = {handleUser} name="Username"/>        
        <input type="text" placeholder="Password" onChange = {handleUser} name="Password"/>
        <input type="text" placeholder="Email" onChange = {handleUser} name="Email"/>
        <input type="text" placeholder="UserType" onChange = {handleUser} name="UserType"/>
        <button onClick={handleClick}>Add</button>
    </div>
};
export default AddUser;