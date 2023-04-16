import React, { useState, useEffect } from 'react'
import Dropdown from '../Dropdown/Dropdown.tsx'
import { Box, CircularProgress } from '@mui/material'

function RaceList (): JSX.Element {
  const [racesMap, setRacesMap] = useState(new Map())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [round, setRound] = useState(1)
  const [selectedYear, setSelectedYear] = useState(2023)
  const [isLoading, setIsLoading] = useState(true)

  // Tracks the most recent round of races
  useEffect(() => {
    void fetch('https://ergast.com/api/f1/current/last/results.json')
      .then(async response => await response.json())
      .then(data => {
        setRound(data.MRData.RaceTable.round)
      })
  }, [])

  // Updates state of circuits in order
  useEffect(() => {
    setIsLoading(true)
    fetch(`https://ergast.com/api/f1/${selectedYear}.json`)
      .then(async response => await response.json())
      .then(data => {
        const races = data.MRData.RaceTable.Races
        const racesObj = races.reduce((acc: any, race: any) => {
          const { circuitId } = race.Circuit
          const { country } = race.Circuit.Location
          const { date, time, round, url, raceName } = race
          acc[circuitId] = { circuitId, raceName, country, date, time, round, url }
          return acc
        }, {})
        const racesMap = new Map(Object.entries(racesObj))
        setRacesMap(racesMap)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [selectedYear])

  // Formats date/time to local timezone
  function handleDateFormat (race: any): string | JSX.Element {
    const utcTimeString = race.time
    const date = new Date(race.date)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const combinedDate = new Date(`${year}-${month}-${day}T${utcTimeString as string}`)
    const localDate = combinedDate.toLocaleString()

    if (Date.parse(race.date) - Date.parse(new Date().toString()) > 0) {
      return localDate
    } else {
      return (<s>{localDate}</s>)
    }
  }

  const yearsList = []
  const currentYear = new Date().getFullYear()
  const earliestYear = 1950
  for (let year = currentYear; year >= earliestYear; year--) {
    yearsList.push(year)
  }

  function handleYearSelect (value: number): void {
    setSelectedYear(value)
  }

  return (
    <>
      {isLoading
        ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            <CircularProgress/>
          </div>
          )
        : (
          <Box sx={{ color: 'white' }}>
            <h2>List of Races</h2>
            <Dropdown options={yearsList} onSelect={handleYearSelect} selectedValue={selectedYear} label="Year"/>
            {[...racesMap.values()].map(race => (
              <div key={race.circuitId}>
                <br/><a href={race.url}><h4>{race.raceName} ({race.country})</h4></a>
                {handleDateFormat(race)}
              </div>
            ))}
          </Box>
          )}
    </>)
}

export default RaceList
