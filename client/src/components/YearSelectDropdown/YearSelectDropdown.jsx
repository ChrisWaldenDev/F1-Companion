import {useEffect, useState} from 'react';
import './yearselectdropdown.css';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

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
        <Box sx={{minWidth: 120}}>
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
                        backgroundColor: '#f9f9f9',
                    }}
                    MenuProps={{
                        anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "right"
                    },
                        transformOrigin: {
                            vertical: "top",
                            horizontal: "right"
                        },
                        PaperProps: {
                            style: {
                                maxHeight: '200px',
                            },
                        },
                    }}
                >{options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}</Select>
            </FormControl>
        </Box>
    );
}

export default YearSelectDropdown;