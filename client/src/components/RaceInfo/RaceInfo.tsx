import React, { useEffect, useState } from 'react'

function RaceInfo (): JSX.Element {
  const [raceData, setRaceData] = useState({
    circuitId: '',
    country: '',
    date: '',
    time: '',
    round: '',
    url: '',
    raceName: '',
    firstPlace: '',
    secondPlace: '',
    thirdPlace: '',
    fastestLap: 'Undefined',
    fastestLapDriver: 'Undefined'
  })

  useEffect(() => {
    void fetch('https://ergast.com/api/f1/2023/2/results.json')
      .then(async response => await response.json())
      .then(data => {
        console.log(data)
        const race = data.MRData.RaceTable.Races[0]
        const { circuitId } = race.Circuit
        const { country } = race.Circuit.Location
        const { date, time, round, url, raceName } = race
        const firstPlace = race.Results[0].Driver.code
        const secondPlace = race.Results[1].Driver.code
        const thirdPlace = race.Results[2].Driver.code
        let fastestLap = 'Undefined'
        let fastestLapDriver = 'Undefined'
        for (let i = 0; i < race.Results.length - 1; i++) {
          if ((Boolean(race.Results[i].FastestLap)) && race.Results[i].FastestLap.rank === '1') {
            fastestLap = race.Results[i].FastestLap.Time.time
            fastestLapDriver = race.Results[i].Driver.code
          }
        }
        setRaceData({
          circuitId,
          country,
          date,
          time,
          round,
          url,
          raceName,
          firstPlace,
          secondPlace,
          thirdPlace,
          fastestLap,
          fastestLapDriver
        })
      })
  }, [])

  return (
    <div>
      <h1>Most Recent Race: <a href={raceData.url}>{raceData.raceName}</a> ({raceData.country})</h1>
      <br/> 1st: {raceData.firstPlace}
      <br/> 2nd: {raceData.secondPlace}
      <br/> 3rd: {raceData.thirdPlace}
      <br/> Fastest Lap: {raceData.fastestLapDriver} | {raceData.fastestLap}
    </div>
  )
}

export default RaceInfo
