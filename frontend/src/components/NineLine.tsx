import {useState} from "react";
import {submitNineLine} from "../service.ts";
import {useNavigate} from "react-router-dom";


const NineLine = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        line5: ''
    })

    const handleSubmit = async (e:any) => {
    e.preventDefault();
    try{
    // onSubmit(formData);
    await submitNineLine(formData)
    } catch (error){
        console.log('Failed', error)
    }
    }

    const handleChange = (e:any) =>{
        const {name, value} = e.target;
        setFormData( prevState => ({...prevState,[name]: value}));
        // console.log(formData);
    }

    return (
        <div>
        <h1>Welcome to the Nine Line Reporting System</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                    type='text'
                    placeholder='Line1'
                    name='line1'
                    aria-label={"Line1"}
                    onChange={handleChange}/>
                    <input
                        type='text'
                        name="line2"
                        placeholder='Line2'
                        onChange={handleChange}/>
                    <input
                        type='text'
                        name="line3"
                        onChange={handleChange}
                        placeholder='Line3'/>
                    <input
                        type='text'
                        onChange={handleChange}
                        name="line4"
                        placeholder='Line4'/>
                    <input
                    type='text'
                    name="line5"
                    onChange={handleChange}
                    placeholder='Line5'/>

                    <button type={"submit"}>Submit</button>
                    <button type={'button'}
                    onClick={()=> navigate('/')}>Exit</button>
                </form>
            </div>
        </div>
    );
};

export default NineLine;