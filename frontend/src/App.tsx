
import './App.css'
import {Dashboard} from "./components/Dashboard.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NineLine from "./components/NineLine.tsx";
import Registration from "./components/Registration.tsx";
import {createContext, useState} from "react";
import Medic from "./components/Medic.tsx";
import MedicAccordion from "./components/MedicAccordion.tsx";

export const UserContext = createContext();
function App() {

    const [userId, setUserId] = useState(null);
    const [job, setJob] = useState(null);

  return (
    <>
        <BrowserRouter>
            <UserContext.Provider value={{userId, setUserId, job, setJob}}>
            <Routes>
                <Route path={"/"} element={<Registration/>}/>
                {/*<Route path={"/"} element={<Dashboard/>}/>*/}
                <Route path={"/submit"} element={<NineLine/>}/>
                <Route path={"/medic"} element={<MedicAccordion nineLine={{
                          id: undefined,
                          line1: '',
                          line2: '',
                          line3: '',
                          line4: '',
                          line5: '',
                          softDelete: undefined
                      }}/>}/>
            </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    </>
  )
}

export default App
