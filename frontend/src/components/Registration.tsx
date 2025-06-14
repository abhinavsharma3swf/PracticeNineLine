import {Button, TextField} from "@mui/material";
import {createRegistration} from "../service.ts";
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App.tsx";



const Registration = () => {

    const navigate = useNavigate();

    const[userInfo,setUserInfo] = useState({
        name:"",
        callSign:"",
        unit:"",
        role:""
    })

    const {name,callSign,unit,role} = userInfo;  //Deconstruction of the userinfo



    const {userId, setUserId} = useContext(UserContext);
    const {job, setJob} = useContext(UserContext);



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const userI = await createRegistration(userInfo)
            setUserId(userI.id)
            setJob(userInfo.role)
        } catch (error) {
            console.error("Failed", error)
        }
        navigate('/')
    }

const handleChange = (e: any) => {
    setUserInfo({...userInfo, [e.target.name] : e.target.value})
}

    return (
        <div>
            <TextField
                onChange={handleChange}
                name="name"
                value={name}
                label="Name"
                variant="outlined"
                aria-label="name"/>
            <TextField
                onChange={handleChange}
                name="callSign"
                value={callSign}
                label="Call-Sign"
                variant="outlined"
                aria-label="callSign" />
            <TextField
                onChange={handleChange}
                name="unit"
                value={unit}
                label="Unit"
                variant="outlined"
                aria-label="unit"/>
            <TextField
                onChange={handleChange}
                label="Role"
                name="role"
                value={role}
                variant="outlined"
                aria-label="role"/>
            <Button aria-label='button'
                    type={"submit"}
                    onClick={handleSubmit}>
                    Submit
            </Button>
        </div>
    );
};

export default Registration;