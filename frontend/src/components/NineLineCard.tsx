import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type {NineLineTypes} from "../NineLineTypes.ts";
import {Button} from "@mui/material";
import {softDelete} from "../service.ts";

type NineLineProps = {
    nineLine : NineLineTypes,
}
export default function NineLineCard({nineLine}:NineLineProps) {
    function handleDelete() {
        // console.log(id);
        // softDelete(id);

        softDelete(nineLine.id);
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Nine Line Card
                </Typography>
                <Typography variant="h5" component="div">
                </Typography>
                <Typography variant="body2">
                    Line 1 (Location): {nineLine.line1} <br/>
                    Line 2 (Call Sign): {nineLine.line2} <br/>
                    Line 3 (Pats By Precedence): {nineLine.line3} <br/>
                    Line 4 (Special Equipment): {nineLine.line4} <br/>
                    Line 5 (Pat By Type): {nineLine.line5}
                    <br />
                </Typography>
            </CardContent>
            <Button onClick={handleDelete}>Delete</Button>
            {/*<Button*/}
            {/*onClick={()=> handleDelete(nineLine.id)}>Delete</Button>*/}
        </Card>
    );
}