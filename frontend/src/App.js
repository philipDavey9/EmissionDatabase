import {BrowserRouter, Routes,Route,} from "react-router-dom";
import SearchEmissions from "./pages/SearchEmission";
import AddEmissions from "./pages/AddEmission";
import Emissions from "./pages/Emissions";
import EditEmission from "./pages/EditEmission";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import SystemAdmin from "./pages/SystemAdmin";
import AddUser from "./pages/AddUser";
import "./style.css";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/Emissions" element={<Emissions/>}/>
        <Route path="/AddEmissions" element={<AddEmissions/>}/>
        <Route path="/Emissions/EditEmission/:EmissionsID" element={<EditEmission/>}/>
        <Route path="/SearchEmissions" element={<SearchEmissions/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/Reports" element={<Reports/>}/>
        <Route path="/UserManagement" element={<UserManagement/>}/>
        <Route path="/SystemAdmin" element={<SystemAdmin/>}/> 
        <Route path="/AddUser" element={<AddUser/>}/> 
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
