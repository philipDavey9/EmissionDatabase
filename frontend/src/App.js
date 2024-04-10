import {BrowserRouter, Routes,Route,} from "react-router-dom";
import EditEmissions from "./pages/EditEmission";
import SearchEmissions from "./pages/SearchEmission";
import AddEmissions from "./pages/AddEmission";
import Emissions from "./pages/Emissions";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/Emissions" element={<Emissions/>}/>
        <Route path="/AddEmissions" element={<AddEmissions/>}/>
        <Route path="/EditEmissions" element={<EditEmissions/>}/>
        <Route path="/SearchEmissions" element={<SearchEmissions/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
