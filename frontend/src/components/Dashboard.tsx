import {useNavigate} from "react-router-dom";

export const Dashboard=()=>{

    const navigate = useNavigate();

    return(
        <>
        <div>
            <button
            onClick={()=> navigate('/submit')}>New Nine Line</button>
        </div>
        <div>
            <button>Fetch All Nine Line</button>
        </div>
        </>
    )
}