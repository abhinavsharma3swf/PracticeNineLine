import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

export const Dashboard=()=>{

    const [data, setData] = useState<any[]>([])

    const navigate = useNavigate();

    async function fetchNineLine() {
        try{
        const response = await axios.get('/api/nineline')
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
            <ul>
                {data.map((item, index)=>(
                    <li key={index}>{item.line1}</li>
                ))}
            </ul>
        </div>
        </>
    )
}