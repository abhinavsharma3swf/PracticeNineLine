import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import NineLineCard from "./NineLineCard.tsx";
import ninelinepic from "../assets/ninelinepic.jpg"
import {UserContext} from "../App.tsx";

export const Dashboard=()=>{

    const [data, setData] = useState<any[]>([])

    const navigate = useNavigate();

    const {job}= useContext(UserContext);

    // const {userInfo} = useParams();
    // console.log(userInfo);

    async function fetchNineLine() {
        try{
        const response = await axios.get('http://localhost:8080/api/nineline')
        setData(response.data)
    } catch(error){
        console.log("Failed", error)
    }
    }
    return(
        <>
        <div className="dashboard">

        <div style={{
            backgroundImage: `url(${ninelinepic})`,
            backgroundSize: 'cover', // or 'contain', 'auto', etc.
            backgroundRepeat: 'no-repeat',
            height: '5vh', // Adjust as needed
            width: '5vw', // Adjust as needed
        }}>
        </div>
            <div className="button">
                <button
                    onClick={() => navigate('/submit')}>New Nine Line
                </button>
            </div>
            <div className="button">
                <button
                    onClick={fetchNineLine}>Fetch All Nine Line
                </button>

                {data.map((item, index) => (
                    <div key={index}>
                        {item.softDelete ? null : <NineLineCard nineLine={item}/>}
                    </div>
                ))}
                <div className="button">
                <button
                    onClick={()=> navigate('/registration')}>
                    Registration
                </button>
                </div>

                {(job === "Dispatcher") ? <h1> Dispatcher</h1>: <h1>You are not a dispatcher GO HOME</h1>}
                {(job === "Medic") ? <h1> Medic</h1> : <h1> You are not a medic </h1>}
            </div>
        </div>
        </>
    )
}