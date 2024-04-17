import {Link} from "react-router-dom";

const SystemAdmin = () => {
    return <div>
        <h1>System Administration</h1>
        <button classname = "button"><Link to ="/SystemAdmin/Gases">Manage Gas Typs</Link></button>
        <button classname = "button"><Link to ="/SystemAdmin/Sources">Manage Sources</Link></button>
        <button classname = "button"><Link to ="/SystemAdmin/Sites">Manage Sites</Link></button>
        <button classname = "button"><Link to ="/SystemAdmin/Device">Manage Devices</Link></button>
        <button className = "button"><Link to="/">Back</Link></button>
        </div>
}
export default SystemAdmin;