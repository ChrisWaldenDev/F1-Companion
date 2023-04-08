import {useState, useEffect} from "react";
import YearSelectDropdown from "../YearSelectDropdown/YearSelectDropdown.jsx";
import Header from "../Header/Header.jsx";
import {CircularProgress} from "@mui/material";

function RaceList() {
    const [racesMap, setRacesMap] = useState(new Map());
    const [round, setRound] = useState(1);
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isLoading, setIsLoading] = useState(true);



    //Tracks the most recent round of races
    useEffect(() => {
        fetch(`https://ergast.com/api/f1/current/last/results.json`)
            .then(response => response.json())
            .then(data => {
                setRound(data.MRData.RaceTable.round);
            })
    }, []);

    //Updates state of circuits in order
    useEffect(() => {
        setIsLoading(true);
        fetch(`https://ergast.com/api/f1/${selectedYear}.json`)
            .then(response => response.json())
            .then(data => {
                const races = data.MRData.RaceTable.Races;
                const racesObj = races.reduce((acc, race) => {
                    const {circuitId} = race.Circuit;
                    const {country} = race.Circuit.Location;
                    const {date, time, round, url, raceName} = race;
                    acc[circuitId] = {circuitId, raceName, country, date, time, round, url};
                    return acc;
                }, {})
                const racesMap = new Map(Object.entries(racesObj));
                setRacesMap(racesMap);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [selectedYear])

    //Formats date/time to local timezone
    function handleDateFormat(race) {
        const utcTimeString = race.time;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const combinedDate = new Date(`${year}-${month}-${day}T${utcTimeString}`);
        const localDate = combinedDate.toLocaleString();

        if (Date.parse(race.date) - Date.parse(new Date().toString()) > 0) {
            return localDate;
        } else {
            return (<strike>{localDate}</strike>);
        }
    }

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
                    <YearSelectDropdown options={yearsList} onSelect={handleYearSelect} selectedValue={selectedYear}/>
                    {[...racesMap.values()].map(race => (
                        <div key={race.circuitId}>
                            <br/><a href={race.url}><h4>{race.raceName} ({race.country})</h4></a>
                            {handleDateFormat(race)}
                        </div>
                    ))}
                </>
            )}
        </>);
}

export default RaceList