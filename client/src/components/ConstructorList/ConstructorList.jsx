import {useEffect, useState} from 'react';
import YearSelectDropdown from "../YearSelectDropdown/YearSelectDropdown.jsx";
import Header from "../Header/Header.jsx";
import {CircularProgress} from "@mui/material";


function ConstructorList() {
    const [constructorsMap, setConstructorsMap] = useState(new Map());
    const [selectedYear, setSelectedYear] = useState(2023);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        fetch(`https://ergast.com/api/f1/${selectedYear}/constructorStandings.json`)
            .then(response => response.json())
            .then(data => {
                const constructors = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                const constructorsObj = constructors.reduce((acc, constructor) => {
                    const {constructorId, name, nationality, url} = constructor.Constructor;
                    const {position, points, wins} = constructor;
                    acc[constructorId] = {constructorId, name, nationality, url, position, points, wins};
                    return acc;
                }, {});
                const constructorsMap = new Map(Object.entries(constructorsObj));
                setConstructorsMap(constructorsMap)
                setIsLoading(false);
            })
    }, [selectedYear])


    //Year select functionality
    let yearsList = [];
    const currentYear = new Date().getFullYear();
    const earliestYear = 1958;
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
                    <h2>List of Constructors</h2>
                    <YearSelectDropdown options={yearsList} onSelect={handleYearSelect} selectedValue={selectedYear}/>
                    <div>
                        <ul>
                            {[...constructorsMap.values()].map((constructor) => (
                                <div key={constructor.constructorId}>
                                    <a href={constructor.url}>{constructor.name}</a>
                                    <br/> Position: {constructor.position}
                                    <br/> Points: {constructor.points}
                                    <br/> Wins: {constructor.wins}
                                </div>
                            ))}
                        </ul>
                    </div>
                </>)}
        </>);
}

export default ConstructorList;