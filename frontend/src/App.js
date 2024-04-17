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
import EditUser from "./pages/EditUser";
import AddGas from "./pages/AddGas";
import AddDevice from "./pages/AddDevice";
import AddSource from "./pages/AddSource";
import Sources from "./pages/Sources";
import Device from "./pages/Device";
import Gases from "./pages/Gases";
import EditGas from "./pages/EditGas";
import EditSource from "./pages/EditSource";
import EditDevice from "./pages/EditDevice";
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
        <Route path="/UserManagement/EditUser/:UserID" element={<EditUser/>}/>  
        <Route path="/SystemAdmin/Gases/AddGas" element={<AddGas/>}/>  
        <Route path="/SystemAdmin/Gases" element={<Gases/>}/>  
        <Route path="/SystemAdmin/Sources" element={<Sources/>}/>  
        <Route path="/SystemAdmin/Device" element={<Device/>}/>  
        <Route path="/SystemAdmin/Device/AddDevice" element={<AddDevice/>}/>  
        <Route path="/SystemAdmin/Sources/AddSource" element={<AddSource/>}/>  
        <Route path="/SystemAdmin/Sources/EditSource/:SourceID" element={<EditSource/>}/>  
        <Route path="/SystemAdmin/Device/EditDevice/:DeviceID" element={<EditDevice/>}/>  
        <Route path="/SystemAdmin/Gases/EditGas/:ChemicalFormula" element={<EditGas/>}/>  
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
