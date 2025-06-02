import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import NineLineCard from "./NineLineCard.tsx";

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
        <>
        <div>
            <button
            onClick={()=> navigate('/submit')}>New Nine Line</button>
        </div>
        <div>
            <button
            onClick={fetchNineLine}>Fetch All Nine Line</button>

                {data.map((item, index)=>(
                    <div key={index}>
                        <NineLineCard nineLine={item}/>
                    </div>
                ))}
        </div>
        </>
    )
}