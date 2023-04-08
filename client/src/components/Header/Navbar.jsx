import {AppBar, Box, Button, Divider, Toolbar, Typography} from "@mui/material";
import {useNavigate} from 'react-router-dom';

//Defines the Navbar
const Navbar = () => {
    const navigate = useNavigate();

    function handleClick(route) {
        navigate(route)
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{
                minHeight: '80px',
                justifyContent: 'center'
            }}>
                <Toolbar>
                    <Button disableRipple onClick={() => handleClick('/')}>
                        <Typography fontSize="x-large" fontWeight="bold" color="#f3f3f3">
                            F1 Companion
                        </Typography>
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem sx={{p: 1, mr: 165}}/>
                    <Button variant="text" disableRipple onClick={() => handleClick('/drivers')}
                            sx={{m: 1, color: "#f3f3f3"}}>
                        Drivers
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Button variant="text" disableRipple onClick={() => handleClick('/constructors')}
                            sx={{m: 1, color: "#f3f3f3"}}>
                        Constructors
                    </Button>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Button variant="text" disableRipple onClick={() => handleClick('/schedule')}
                            sx={{m: 1, color: "#f3f3f3"}}>
                        Schedule
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
/*<nav className="navbar">
            <div className="logo">
                <a href="#">F1 Companion</a>
            </div>
            <ul>
                <li><a href="#">Drivers</a></li>
                <li><a href="#">Constructors</a></li>
                <li><a href="#">Races</a></li>
            </ul>
        </nav>*/
export default Navbar;