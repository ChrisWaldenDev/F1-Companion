import {useEffect, useState} from 'react';
import './yearselectdropdown.css';
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";

function YearSelectDropdown({options, onSelect, selectedValue}) {
    const [selectedYear, setSelectedYear] = useState(options[0]);

    useEffect(() => {
        setSelectedYear(selectedValue);
    }, [selectedValue])

    function handleChange(event) {
        setSelectedYear(event.target.value);
        onSelect(event.target.value);
    }

    return (
        <Box sx={{minWidth: 120, m: '10px'}}>
            <FormControl variant="filled">
                <InputLabel id="year-select-label" sx={{mt: '-6px'}}>Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    id="year-select"
                    value={selectedYear}
                    label="Year"
                    onChange={handleChange}
                    classes={{select: 'selected'}}
                    sx={{
                        backgroundColor: '#f3f3f3',

                    }}
                >{options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}</Select>
            </FormControl>
        </Box>
    );
}

export default YearSelectDropdown;