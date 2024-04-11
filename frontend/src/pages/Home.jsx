import {Link} from "react-router-dom";

const home = ()=> {

    return <div>
        <button className = "homebutton"><Link to = "/UserManagement">User Management</Link></button>
        <button className = "homebutton"><Link to ="/Emissions" >Manage Emissions</Link></button>
        <button className = "homebutton"><Link to = "/Reports">Reports</Link></button>
        <button className = "homebutton"><Link to = "/SystemAdmin">System Administration</Link></button>
    </div>
}
export default home;
