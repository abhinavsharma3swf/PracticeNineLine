
import './App.css'
import {Dashboard} from "./components/Dashboard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NineLine from "./components/NineLine.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Dashboard/>}/>
                <Route path={"/submit"} element={<NineLine/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
