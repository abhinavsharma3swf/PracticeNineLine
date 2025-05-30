import {useState} from "react";


const NineLine = ({onSubmit}: any) => {

    const [formData, setFormData] = useState({
        Line1: '',
        Line2: '',
        Line3: '',
        Line4: '',
        Line5: ''
    })
    function handleSubmit(e:any) {
    e.preventDefault();
    onSubmit(formData);
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
                    name='Line1'
                    onChange={handleChange}/>
                    <input
                        type='text'
                        name="Line2"
                        placeholder='Line2'
                        onChange={handleChange}/>
                    <input
                        type='text'
                        name="Line3"
                        onChange={handleChange}
                        placeholder='Line3'/>
                    <input
                        type='text'
                        onChange={handleChange}
                        name="Line4"
                        placeholder='Line4'/>
                    <input
                    type='text'
                    name="Line5"
                    onChange={handleChange}
                    placeholder='Line5'/>

                    <button type={"submit"}>Submit</button>

                </form>
            </div>
        </div>
    );
};

export default NineLine;