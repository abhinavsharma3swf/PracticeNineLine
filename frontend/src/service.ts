import axios from "axios";
import type {NineLineTypes} from "./NineLineTypes.ts";
import type {UserTypes} from "./UserTypes.ts";

export const submitNineLine = async (data: any)=>{
    console.log(data)

const response = await axios.post('http://localhost:8080/api/nineline',data);
    console.log(data)
return response.data;
}

export const fetchNineLine = async ()=>{
    const response = await axios.get('http://localhost:8080/api/nineline');
    return response.data;
}

export const softDelete = async (id:any)=>{
    const response = await axios.patch(`http://localhost:8080/api/nineline/${id}`);
    return response.data;
}

export const saveNineLine = async (data:NineLineTypes)=>{
    console.log("test")
    const response = await axios.put(`http://localhost:8080/api/nineline/edit/${data.id}`,data)
    return response.data;
}

export const createRegistration = async (data: UserTypes) => {
    try {
        const response = await axios.post('http://localhost:8080/api/registration', data);
        return response.data;
    } catch(error) {
        console.error("Failed", error);
        throw error;
    }
}