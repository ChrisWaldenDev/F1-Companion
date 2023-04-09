import {useState, useEffect} from "react";
import YearSelectDropdown from "../YearSelectDropdown/YearSelectDropdown.jsx";
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
                const driversObj = drivers.reduce((acc, driver) => {
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

    function handleYearSelect(value) {
        setSelectedYear(value)
    }

    function createData(name, position, points, wins, nationality, constructorName) {
        return {name, position, points, wins, nationality, constructorName};
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

    function getPositionStyle(position) {
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
                if (position > 3) {
                    backgroundColor = position % 2 === 0 ? '#f9f9f9' : '#ffffff';
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
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {isLoading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <CircularProgress/>
                </div>
            ) : (

                <TableContainer component={Paper} className="table-container"
                                sx={{maxWidth: '1000px', mt: '16px', backgroundColor: '#f9f9f9',
                                    my: '16px', overflowY: 'scroll', height:'690px'}}>
                    <Box sx={{
                        mt: '16px',
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
                        <YearSelectDropdown options={yearsList} onSelect={handleYearSelect}
                                            selectedValue={selectedYear}/>
                    </Box>
                    <Divider/>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#f1f1f1'}}>
                            <TableRow>
                                <TableCell><EmojiEventsIcon/></TableCell>
                                <TableCell>Driver Name</TableCell>
                                <TableCell align="left">Points</TableCell>
                                <TableCell align="left">Wins</TableCell>
                                <TableCell align="left">Team</TableCell>
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
            )}
        </Box>)
}


/*
<>
                    <h2>List of Drivers</h2>
                    <YearSelectDropdown options={yearsList} onSelect={handleYearSelect} selectedValue={selectedYear}/>
                    <div>
                        <ul>
                            {[...driversMap.values()].map((driver) => (
                                <div key={driver.driverId}>
                                    <a href={driver.url}>{driver.givenName} {driver.familyName} </a>
                                    <br/> Position: {driver.position}
                                    <br/> Points: {driver.points}
                                    <br/> Wins: {driver.wins}
                                    <br/> Team: {driver.name}
                                </div>
                            ))}
                        </ul>
                    </div>
                </>
 */

function calculateAge(dateOfBirth) {
    const now = new Date();
    const birth = new Date(dateOfBirth);
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
        years--;
    }

    return years;
}

export default DriverList;

/*
code
:
"ALO"
dateOfBirth
:
"1981-07-29"
driverId
:
"alonso"
familyName
:
"Alonso"
givenName
:
"Fernando"
nationality
:
"Spanish"
permanentNumber
:
"14"
url
:
"http://en.wikipedia.org/wiki/Fernando_Alonso"
*/