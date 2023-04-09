import {useState, useEffect} from "react";
import {Box} from "@mui/material";
import './infobar.css';

//Provides Date/Time
const Infobar = () => {
    return (
        <Box className="infobar" sx={{flexGrow: 1,
        backgroundColor: 'primary.dark',
        color: '#f3f3f3',
        display: 'flex',
        justifyContent: 'center',
        p:0.5}}>
            <p>{getDate()}</p>
        </Box>
    )
}

const getDate = () => {
    const date = new Date();
    const [time, setTime] = useState(date);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        //Dumps timer when component unmounts
        return () => {
            clearInterval(timerID);
        };
    });

    const tick = () => {
        setTime(new Date())
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `Current Date: ${month}/${day}/${year} | Current Time: ${time.toLocaleTimeString()}`;
}

export default Infobar;