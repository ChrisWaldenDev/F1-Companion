import React from "react";
import {useState, useEffect} from "react";
import Dropdown from "../Dropdown/Dropdown.js";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import './driverlist.css';
import {
    Box,
    CircularProgress, Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

function DriverList() {
    const [driversMap, setDriversMap] = useState(new Map());
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isLoading, setIsLoading] = useState(true);
    const rows = [];

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://ergast.com/api/f1/${selectedYear}/driverStandings.json`)
            .then(response => response.json())
            .then(data => {
                const drivers = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                const driversObj = drivers.reduce((acc: any, driver: any) => {
                    const {driverId, givenName, familyName, nationality, dateOfBirth, url} = driver.Driver;
                    const {constructorId, name} = driver.Constructors[0];
                    const {position, points, wins} = driver;
                    acc[driverId] = {
                        driverId,
                        givenName,
                        familyName,
                        nationality,
                        dateOfBirth,
                        url,
                        position,
                        points,
                        wins,
                        constructorId,
                        name
                    };
                    return acc;
                }, {});
                const driversMap = new Map(Object.entries(driversObj));
                setDriversMap(driversMap);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [selectedYear]);

    //Year select functionality
    let yearsList = [];
    const currentYear = new Date().getFullYear();
    const earliestYear = 1950;
    for (let year = currentYear; year >= earliestYear; year--) {
        yearsList.push(year);
    }

    function handleYearSelect(value: number) {
        setSelectedYear(value)
    }

    function createData(name: string, position: string, points: string, wins: string, nationality: string, constructorName: string, age: string) {
        return {name, position, points, wins, nationality, constructorName, age};
    }

    for (let driver of driversMap.values()) {
        const {givenName, familyName, nationality, dateOfBirth, name: constructorName} = driver;
        const position = driver.position;
        const points = driver.points;
        const wins = driver.wins;
        const age = calculateAge(dateOfBirth);
        const name = `${givenName} ${familyName}`;
        const data = createData(name, position, points, wins, nationality, constructorName, age);
        rows.push(data);
    }

    function getPositionStyle(position: string) {
        let backgroundColor = '#f3f3f3';
        let fontWeight = "regular";
        switch (position) {
            case "1":
                backgroundColor = '#C9B037';
                fontWeight = "bold";
                break;
            case "2":
                backgroundColor = '#D7D7D7';
                fontWeight = "bold";
                break;
            case "3":
                backgroundColor = '#AD8A56';
                fontWeight = "bold";
                break;
            default:
                break;
        }

        switch (backgroundColor) {
            case '#f3f3f3':
                if (parseInt(position) > 3) {
                    backgroundColor = parseInt(position) % 2 === 0 ? '#f9f9f9' : '#ffffff';
                }
                break;
            default:
                break;
        }
        return {
            backgroundColor,
            fontWeight
        }
    }

    return (
        <Box sx={{display: 'flex', mt: '16px', flexDirection: 'column', alignItems: 'center'}}>
            <TableContainer component={Paper} className="table-container"
                            sx={{
                                maxWidth: '1000px', backgroundColor: '#f9f9f9',
                                overflowY: 'scroll', height: '675px', position: 'relative'
                            }}>
                {isLoading && (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                        <CircularProgress/>
                    </div>
                )}
                <Box sx={{
                    my: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h4" sx={{
                        ml: '145px',
                        justifyContent: 'center',
                        textAlign: 'center',
                        flexGrow: 1,
                        display: 'flex',
                        fontWeight: 'bold'
                    }}>{selectedYear} Driver Standings</Typography>
                    <Dropdown options={yearsList} onSelect={handleYearSelect}
                              selectedValue={selectedYear} label="Year"/>
                </Box>
                <Divider/>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead sx={{backgroundColor: '#f1f1f1', position: 'sticky', top: 0}}>
                        <TableRow>
                            <TableCell sx={{display: 'flex'}}><EmojiEventsIcon/></TableCell>
                            <TableCell align="left" sx={{fontSize: 'large'}}>Driver Name</TableCell>
                            <TableCell align="left" sx={{fontSize: 'large'}}>Points</TableCell>
                            <TableCell align="left" sx={{fontSize: 'large'}}>Wins</TableCell>
                            <TableCell align="left" sx={{fontSize: 'large'}}>Team</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.position}
                                      sx={{backgroundColor: index % 2 !== 0 ? '#f9f9f9' : '#ffffff'}}>
                                <TableCell align="center" scope="row"
                                           sx={{width: '10px', ...getPositionStyle(row.position)}}>{row.position}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.points}</TableCell>
                                <TableCell align="left">{row.wins}</TableCell>
                                <TableCell align="left">{row.constructorName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>)
}

function calculateAge(dateOfBirth: string): string {
    const now = new Date();
    const birth = new Date(dateOfBirth);
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
    }

    return years.toString();
}

export default DriverList;