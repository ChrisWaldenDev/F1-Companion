import {useState, useEffect} from "react";
import YearSelectDropdown from "../YearSelectDropdown/YearSelectDropdown.jsx";
import Header from "../Header/Header.jsx";
import {CircularProgress} from "@mui/material";

function DriverList() {
    const [driversMap, setDriversMap] = useState(new Map());
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        fetch(`http://ergast.com/api/f1/${selectedYear}/driverStandings.json`)
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


    return (
        <>
            <Header/>
            {isLoading ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <CircularProgress/>
                </div>
            ) : (
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
            )}
        </>);
}

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