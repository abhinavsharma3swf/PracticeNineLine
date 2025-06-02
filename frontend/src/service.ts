import axios from "axios";

export const submitNineLine = async (data: any)=>{
const response = await axios.post('http://localhost:8080/api/nineline', data);
return response.data;
}

export const fetchNineLine = async ()=>{
    const response = await axios.get('http://localhost:8080/api/nineline');
    return response.data;
}