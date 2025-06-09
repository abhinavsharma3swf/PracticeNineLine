import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import {FaHelicopter} from "react-icons/fa";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {useNavigate} from "react-router-dom";
import MedicAccordion from "./MedicAccordion.tsx";
import {useState} from "react";


const Medic = () => {

    const [nine1, setNine1] = useState({
        line1: "",
        line2: "" ,
        line3: "",
        line4: "",
        line5: ""
    })

    const navigate = useNavigate();
    function handleNavigateNewLine() {
        navigate("/submit");
    }

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FaHelicopter size={35}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            9-Line MEDEVAC
                        </Typography>

                        <Button onClick={handleNavigateNewLine}
                            sx={{color: "white"}}>New Nine Line Request</Button>
                        <Button sx={{color: "white"}}>Existing Nine Line Requests</Button>

                    </Toolbar>
                </Container>
            </AppBar>
            <MedicAccordion nineLine={nine1}/>
        </div>
    );
};

export default Medic;