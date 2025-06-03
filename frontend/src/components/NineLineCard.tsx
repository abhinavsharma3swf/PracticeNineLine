import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type {NineLineTypes} from "../NineLineTypes.ts";
import {Button, TextareaAutosize} from "@mui/material";
import {saveNineLine, softDelete} from "../service.ts";
import {useState} from "react";

type NineLineProps = {
    nineLine : NineLineTypes,
}
export default function NineLineCard({nineLine}:NineLineProps) {

    const [edit, setEdit] = useState(false);
    const [save, setSave] = useState(false);
    const [line1, setLine1] = useState(nineLine.line1);
    const [line2, setLine2] = useState(nineLine.line2);
    const [line3, setLine3] = useState(nineLine.line3);
    const [line4, setLine4] = useState(nineLine.line4);
    const [line5, setLine5] = useState(nineLine.line5);
    function handleDelete() {
        // console.log(id);
        // softDelete(id);

        softDelete(nineLine.id);
    }

    function handleEdit() {
        setEdit(true);
    }

    function handleSave() {
        saveNineLine(nineLine.id)
        setEdit(false);
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 18 }}>
                    Nine Line Card
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography variant="body2">
                    Line 1 (Location): {edit ?
                        <TextareaAutosize value={line1}
                        onChange={(e)=>setLine1(e.target.value)}
                        aria-label='line1textarea'></TextareaAutosize> : (line1)}
                        </Typography>

                <Typography variant='body2'>
                    Line 2 (Call Sign): {edit ? (
                    <TextareaAutosize value={line2}
                                      onChange={(e)=>setLine2(e.target.value)}></TextareaAutosize>) : (line2)}
                </Typography>
                <Typography variant='body2'>
                    Line 3 (Pats By Precedence): {edit ? (
                    <TextareaAutosize value={line3}
                                      onChange={(e)=>setLine3(e.target.value)}></TextareaAutosize>) : (line3)}
                </Typography>
                <Typography variant='body2'>
                    Line 4 (Special Equipment): {edit ? (
                    <TextareaAutosize value={line4}
                                      onChange={(e)=>setLine4(e.target.value)}></TextareaAutosize>) : (line4)}
                </Typography>
                <Typography variant='body2'>
                    Line 5 (Pat By Type): {edit ? (
                    <TextareaAutosize value={line5}
                                      onChange={(e)=>setLine5(e.target.value)}></TextareaAutosize>) : (line5)}
                </Typography>
            </CardContent>


            {!edit ? (<Button onClick={handleEdit}>Edit</Button> ) : null}
            {!edit ? (<Button onClick={handleDelete}>Delete</Button> ) : null}
            {edit ? <Button onClick={handleSave}>Save</Button> : null }

            {/*<Button*/}
            {/*onClick={()=> handleDelete(nineLine.id)}>Delete</Button>*/}
        </Card>
    );
}