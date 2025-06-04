import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import NineLineCard from "./NineLineCard.tsx";
import ninelinepic from "../assets/ninelinepic.jpg"

export const Dashboard=()=>{

    const [data, setData] = useState<any[]>([])

    const navigate = useNavigate();

    async function fetchNineLine() {
        try{
        const response = await axios.get('http://localhost:8080/api/nineline')
        setData(response.data)

    } catch(error){
        console.log("Failed", error)
    }
    }
    return(
        <div style={{
            backgroundImage: `url(${ninelinepic})`,
            backgroundSize: 'cover', // or 'contain', 'auto', etc.
            backgroundRepeat: 'no-repeat',
            height: '100vh', // Adjust as needed
            width: '100vw', // Adjust as needed
        }}>
            <div>
                <button
                    onClick={() => navigate('/submit')}>New Nine Line
                </button>
            </div>
            <div>
                <button
                    onClick={fetchNineLine}>Fetch All Nine Line
                </button>

                {data.map((item, index) => (
                    <div key={index}>
                        {item.softDelete ? null : <NineLineCard nineLine={item}/>}
                    </div>
                ))}
            </div>
        </div>
    )
}