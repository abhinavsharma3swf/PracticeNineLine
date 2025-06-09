
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type {NineLineTypes} from "../NineLineTypes.ts";
import {Button, Checkbox, FormControlLabel, FormGroup, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type AccordionProps = {
    nineLine: NineLineTypes;

}
export default function MedicAccordion({nineLine}: AccordionProps) {

    const [nine, setNine] = useState(nineLine);
    const navigate = useNavigate();
    const [checkedLine1, setCheckedLine1] = useState(false);
    const [checkedLine2, setCheckedLine2] = useState(false);

    const handleChange = (e:any) => {
        setNine({...nine, [e.target.name]: e.target.value});
        console.log(nine);
    }

    const handleSubmit = () => {
        navigate("/submit", {
            state: {nineLine : nine}
        });
    };


    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"

                >
                    <Typography component="span">Line 1 (Location)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField placeholder={"Location"}
                    value={nine.line1}
                    onChange={handleChange}
                    name={"line1"}>
                    </TextField>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"

                >
                    <Typography component="span">Line 2 (Call-Sign)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField placeholder={"Call-Sign"}
                    value={nine.line2}
                    onChange={handleChange}
                    name={"line2"}>

                    </TextField>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"

                >
                    <Typography component="span">Line 3 (Number of Pat by Priority)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                         <FormControlLabel label="Urgent" control={<Checkbox onChange={(e) => {setCheckedLine1(e.target.checked)}}/>}/>

                        <TextField placeholder={"Number of Pat by Urgent"}
                               value={nine.line3}
                               onChange={handleChange}
                               name={"line3"}
                                   hidden={!checkedLine1}
                        />
                        <FormControlLabel label="Priority" control={<Checkbox onChange={(e) => {setCheckedLine2(e.target.checked)}}/>}/>
                        <TextField placeholder={"Number of Pat by Priority"}
                                   value={nine.line3}
                                   onChange={handleChange}
                                   name={"line3"}
                                   hidden={!checkedLine2}
                        />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
            <Button
            onClick={handleSubmit}>Submit Nine Line Report</Button>
        </div>
    );
}
