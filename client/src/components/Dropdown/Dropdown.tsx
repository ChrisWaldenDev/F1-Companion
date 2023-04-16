import React from "react";
import {useEffect, useState} from 'react';
import './dropdown.css';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

type DrowdownProps = {
    options: any[];
    onSelect: (value: any) => void;
    selectedValue: any;
    label: string;
}

function Dropdown({options, onSelect, selectedValue, label}: DrowdownProps) {
    const [selectedOption, setSelectedOption] = useState(options[0]);

    useEffect(() => {
        setSelectedOption(selectedValue);
    }, [selectedValue])

    function handleChange(event: any) {
        setSelectedOption(event.target.value);
        onSelect(event.target.value);
    }

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl variant="filled">
                <InputLabel id="option-select-label" sx={{mt: '-6px'}}>Year</InputLabel>
                <Select
                    labelId="option-select-label"
                    id="option-select"
                    value={selectedOption}
                    label={label}
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

export default Dropdown;