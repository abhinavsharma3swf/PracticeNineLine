
import './App.css'
import {Dashboard} from "./components/Dashboard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NineLine from "./components/NineLine.tsx";
import Registration from "./components/Registration.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/"} element={<Dashboard/>}/>
                <Route path={"/submit"} element={<NineLine/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
