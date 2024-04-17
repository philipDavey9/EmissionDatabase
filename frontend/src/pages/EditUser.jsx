import React from "react"
import {useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom"
import {Link} from "react-router-dom"


const EditUser = () => {
   
    const[User,setUser] = useState({
        Username:"",
        Password:"",
        Email:"",
        UserType:""
    });
    const navigate = useNavigate()
    const location = useLocation()
    const ID = location.pathname.split("/")[3]

    const handleUser = (e) => {
        setUser((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.put("http://localhost:3656/user/"+ID,User)
            navigate("/UserManagement")
        }catch(err){
            console.log(err)
        }
    }
    return <div className = "form">
        <h1>Update User</h1>
        <input type="text" placeholder="Username" onChange = {handleUser} name = "Username"/>
        <input type="text" placeholder="Password" onChange = {handleUser} name = "Password"/>
        <input type="text" placeholder="Email" onChange = {handleUser} name = "Email"/>
        <input type="text" placeholder="UserType" onChange = {handleUser} name = "UserType"/>
        <button onClick={handleClick}>Update</button>
        <button className = "button"><Link to="/UserManagement">Back</Link></button>
    </div>
}
export default EditUser;